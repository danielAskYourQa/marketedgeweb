/* Term slider over the all-rates table: pick any term and see every provider's offer at it, cheapest total first,
   with the gap to the client; the table row for that term is highlighted and scrolled into view.
   Works for content added later (expanded rows, the pop-up): METerms.init(root) sets up the sliders in root. */
(function () {
  var fmt = function (v, d) { return v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); };
  function render(box) {
    var input = box.querySelector('input'), terms = JSON.parse(input.dataset.terms), term = terms[+input.value];
    var wrap = box.nextElementSibling, row = wrap.querySelector('tr[data-term="' + term + '"]');
    box.querySelector('.d-term__value').textContent = term + ' months';
    wrap.querySelectorAll('tr.is-term').forEach(function (r) { r.classList.remove('is-term'); });
    var offers = [];
    if (row) {
      row.classList.add('is-term');
      wrap.scrollTop = row.offsetTop - wrap.clientHeight / 2 + row.offsetHeight / 2;
      row.querySelectorAll('td[data-provider]').forEach(function (td) {
        offers.push({ p: td.dataset.provider, label: td.dataset.label, color: td.dataset.color, card: td.dataset.card === '1',
                      monthly: +td.dataset.monthly, total: +td.dataset.total });
      });
    }
    offers.sort(function (a, b) { return (a.card - b.card) || (a.total - b.total); });  // card plans never compete: last
    var mine = offers.filter(function (o) { return o.p === box.dataset.client; })[0];
    var list = box.querySelector('.d-term__list');
    list.innerHTML = offers.length ? offers.map(function (o) {
      var gap = !mine || o === mine || o.card ? '' : '<em class="' + (o.total < mine.total ? 'is-bad' : 'is-ok') + '">'
        + (o.total < mine.total ? '−' : '+') + fmt(Math.abs(o.total - mine.total), 0) + ' lei</em>';
      return '<li class="' + (o === mine ? 'is-client' : '') + (o.card ? ' is-card' : '') + '"><i style="background:' + o.color + '"></i>'
        + '<span>' + o.label + (o.card ? ' <small>card plan</small>' : '') + '</span><b>' + fmt(o.monthly, 2) + '<small> lei/mo</small></b>'
        + '<span class="d-term__total">' + fmt(o.total, 0) + ' lei total</span>' + gap + '</li>';
    }).join('') : '<li class="is-empty">No provider offers this term.</li>';
    if (offers.length && !mine) list.innerHTML += '<li class="is-empty">' + box.dataset.clientLabel + ' has no offer at ' + term + ' months.</li>';
  }
  document.addEventListener('input', function (e) { var box = e.target.closest('.d-term'); if (box) render(box); });
  // A closed <details> can't scroll its table, so render again when "All rates" is opened (toggle doesn't bubble).
  document.addEventListener('toggle', function (e) { if (e.target.open) e.target.querySelectorAll('.d-term').forEach(render); }, true);
  window.METerms = { init: function (root) { root.querySelectorAll('.d-term').forEach(render); } };
})();
