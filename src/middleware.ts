import { NextResponse, type NextRequest } from "next/server";

// Password gate for the Leasing Intelligence demo pages (/leasing/<client>). Each client has its own
// password, so one client cannot open another client's page by editing the URL. Set in Vercel:
//   LEASING_PASSWORD_LEANPAY, LEASING_PASSWORD_UNICREDIT, LEASING_PASSWORD_TBI
// A client without a password set is closed (fails closed, never open).
const CLIENTS: Record<string, string> = {
  leanpay: "LEASING_PASSWORD_LEANPAY",
  unicredit: "LEASING_PASSWORD_UNICREDIT",
  tbi: "LEASING_PASSWORD_TBI",
};

// What the browser's sign-in box sent, user name and password. Decoded as UTF-8 so passwords with
// diacritics match; both trimmed, since a pasted password often carries a space.
function credentialsFrom(request: NextRequest): string[] {
  const header = request.headers.get("authorization") ?? "";
  if (!header.startsWith("Basic ")) return [];
  try {
    const bytes = Uint8Array.from(atob(header.slice(6).trim()), (c) => c.charCodeAt(0));
    const decoded = new TextDecoder().decode(bytes);
    const at = decoded.indexOf(":");
    return [decoded.slice(at + 1), decoded.slice(0, at)].map((s) => s.trim());
  } catch {
    return [];
  }
}

export function middleware(request: NextRequest) {
  const client = request.nextUrl.pathname.split("/")[2] ?? "";
  const envName = CLIENTS[client];
  if (!envName) return new NextResponse("Not found", { status: 404 });

  // trimmed: a value pasted into Vercel often ends in a newline
  const expected = process.env[envName]?.trim();
  if (!expected) return new NextResponse("This page is not available.", { status: 503 });

  // the password in either box: people often type it as the user name and leave the password empty
  if (credentialsFrom(request).includes(expected)) return NextResponse.next();
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="MarketEdge Leasing ${client}", charset="UTF-8"` },
  });
}

export const config = {
  matcher: ["/leasing", "/leasing/:path*"],
};
