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

function passwordFrom(request: NextRequest): string | null {
  const header = request.headers.get("authorization") ?? "";
  if (!header.startsWith("Basic ")) return null;
  try {
    const decoded = atob(header.slice(6));
    return decoded.slice(decoded.indexOf(":") + 1); // any user name
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const client = request.nextUrl.pathname.split("/")[2] ?? "";
  const envName = CLIENTS[client];
  if (!envName) return new NextResponse("Not found", { status: 404 });

  const expected = process.env[envName];
  if (!expected) return new NextResponse("This page is not available.", { status: 503 });

  if (passwordFrom(request) === expected) return NextResponse.next();
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="MarketEdge Leasing ${client}", charset="UTF-8"` },
  });
}

export const config = {
  matcher: ["/leasing", "/leasing/:path*"],
};
