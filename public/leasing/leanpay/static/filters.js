/* The filter bar and column sorting. A partner is any element with data-item. Filters combine (AND) and live in
   the URL hash, so a filtered view can be reloaded, shared or kept across clients, snapshots and pages. */
(function () {
  var items = function () { return Array.prototype.slice.call(document.querySelectorAll('[data-item]')); };
  var search = document.getElementById('f-search');
  var selects = Array.prototype.slice.call(document.querySelectorAll('.d-filters [data-facet]'));
  if (!search) return;

  // a partner's value can be a list (e.g. the competitors on its page, separated by spaces): any of them matches
  function matches(el, key, value) {
    if (!value) return true;
    var own = el.dataset[key.replace(/_(\w)/g, function (_, c) { return c.toUpperCase(); })] || '';
    return (' ' + own + ' ').indexOf(' ' + value + ' ') !== -1;
  }

  function apply() {
    var needle = search.value.trim().toLowerCase();
    var active = {};
    selects.forEach(function (s) { if (s.value) active[s.dataset.facet] = s.value; s.classList.toggle('is-set', !!s.value); });
    var shownNames = {}, allNames = {};
    items().forEach(function (el) {
      var ok = (!needle || el.dataset.name.indexOf(needle) !== -1)
        && Object.keys(active).every(function (k) { return matches(el, k, active[k]); });
      el.hidden = !ok;
      allNames[el.dataset.name] = true;  // a partner can appear more than once (the price matrix, once per term)
      if (ok) shownNames[el.dataset.name] = true;
    });
    var shown = Object.keys(shownNames).length, total = Object.keys(allNames).length;
    document.getElementById('f-count').textContent = shown === total ? total + ' partners' : shown + ' of ' + total + ' partners';
    document.getElementById('f-empty').hidden = shown > 0;
    var keys = Object.keys(active);
    document.getElementById('f-clear').hidden = !keys.length && !needle;
    history.replaceState(null, '', keys.length ? '#' + keys.map(function (k) { return k + '=' + encodeURIComponent(active[k]); }).join('&')
                                               : window.location.pathname + window.location.search);
    document.dispatchEvent(new CustomEvent('me:filtered'));  // pages that show one partner at a time follow it
  }

  search.addEventListener('input', apply);
  selects.forEach(function (s) { s.addEventListener('change', apply); });
  document.getElementById('f-clear').addEventListener('click', function () {
    search.value = '';
    selects.forEach(function (s) { s.value = ''; });
    apply();
  });
  // Restore from the hash; an option these partners don't have is ignored.
  window.location.hash.replace(/^#/, '').split('&').forEach(function (pair) {
    var kv = pair.split('='), value = decodeURIComponent(kv[1] || '');
    var s = selects.filter(function (x) { return x.dataset.facet === kv[0]; })[0];
    if (s && value && s.querySelector('option[value="' + value + '"]')) s.value = value;
  });
  apply();

  /* Sorting: buttons with data-sort="<key>" reorder the data-item elements inside their container by
     data-sort-<key>; a second click reverses. Worst first on a question column: bad, warn, n/a, ok. */
  window.MESort = function (container, key, dir) {
    var list = items().filter(function (el) { return el.parentNode === container; });
    list.sort(function (a, b) {
      var x = a.dataset['sort' + key[0].toUpperCase() + key.slice(1)], y = b.dataset['sort' + key[0].toUpperCase() + key.slice(1)];
      var nx = parseFloat(x), ny = parseFloat(y);
      var c = (!isNaN(nx) && !isNaN(ny)) ? nx - ny : String(x).localeCompare(String(y));
      return dir === 'desc' ? -c : c;
    });
    list.forEach(function (el) { container.appendChild(el); });
  };
})();
