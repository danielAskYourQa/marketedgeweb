/* Question pages: the term picker of the price matrix, the all-terms pop-up of the calculator grid, the partner list of
   the finance page (following the filters), and the homepage screenshots zoomed on the green box. */
(function () {
  var prices = document.getElementById('p-prices');
  if (prices) document.querySelectorAll('.p-terms [data-term]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.p-terms [data-term]').forEach(function (b) { b.classList.toggle('is-on', b === btn); });
      prices.querySelectorAll('tbody[data-term]').forEach(function (body) { body.hidden = body.dataset.term !== btn.dataset.term; });
    });
  });

  // Calculator grid: a calculator's "N terms" opens all of its terms in a pop-up; Esc, × or the backdrop close it.
  var modal = document.getElementById('p-modal');
  if (modal) {
    document.addEventListener('click', function (e) {
      var open = e.target.closest('[data-terms]');
      if (!open) return;
      document.getElementById('p-modal-content').replaceChildren(document.getElementById('terms-' + open.dataset.terms).content.cloneNode(true));
      modal.showModal();
      modal.scrollTop = 0;
    });
    modal.querySelector('[data-close]').addEventListener('click', function () { modal.close(); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });
  }

  // Finance page: picking a partner in the list shows its page on the right; when the filters hide the partner on
  // show, the first one left is shown instead (none left: nothing is).
  function pick(item) {
    document.querySelectorAll('[data-pick]').forEach(function (i) { i.classList.toggle('is-on', i === item); });
    document.querySelectorAll('[data-panel]').forEach(function (p) { p.hidden = !item || p.dataset.panel !== item.dataset.pick; });
  }
  document.querySelectorAll('[data-pick]').forEach(function (item) {
    item.addEventListener('click', function () { pick(item); });
  });
  function follow() {
    var on = document.querySelector('[data-pick].is-on');
    if (on && on.hidden) pick(document.querySelector('[data-pick]:not([hidden])'));
    else if (!on) pick(document.querySelector('[data-pick]:not([hidden])'));
  }
  if (document.querySelector('[data-pick]')) {
    document.addEventListener('me:filtered', follow);
    follow();  // the filters were already applied (from the URL) before this script ran
  }

  // Show the boxed banner with some of the page around it: scale the screenshot so the box takes ~70% of the
  // frame's width, and move it so the box sits in the middle.
  function crop(link) {
    var img = link.querySelector('img'), box = JSON.parse(link.dataset.box || 'null');
    if (!box || !img.naturalWidth || !link.clientWidth) return;
    var scale = Math.min(1.5, link.clientWidth * 0.7 / box.width);
    img.style.width = img.naturalWidth * scale + 'px';
    var x = (box.x + box.width / 2) * scale - link.clientWidth / 2, y = (box.y + box.height / 2) * scale - link.clientHeight / 2;
    img.style.transform = 'translate(' + -Math.max(0, x) + 'px,' + -Math.max(0, y) + 'px)';
  }
  document.querySelectorAll('.p-crop[data-box]').forEach(function (link) {
    var img = link.querySelector('img');
    if (img.complete) crop(link); else img.addEventListener('load', function () { crop(link); }, { once: true });
  });
  window.addEventListener('resize', function () { document.querySelectorAll('.p-crop[data-box]').forEach(crop); });
})();
