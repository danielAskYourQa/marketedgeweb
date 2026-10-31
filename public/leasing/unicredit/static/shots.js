/* Homepage screenshots: open each frame scrolled to the green box. Hidden frames (collapsed rows, the pop-up
   before it opens) have no size yet, so MEShots.init(root) runs again when they are shown. */
(function () {
  function place(fig) {
    var img = fig.querySelector('img'), frame = fig.querySelector('.d-shot__frame'), box = JSON.parse(fig.dataset.box || 'null');
    if (!box || !img.naturalWidth || !frame.clientHeight) return;
    var scale = img.clientWidth / img.naturalWidth;
    frame.scrollTop = Math.max(0, (box.y + box.height / 2) * scale - frame.clientHeight / 2);
  }
  // the banner section opens closed: place its screenshot when it is opened (toggle doesn't bubble)
  document.addEventListener('toggle', function (e) { if (e.target.open) window.MEShots.init(e.target); }, true);
  window.MEShots = {
    init: function (root) {
      root.querySelectorAll('.d-shot').forEach(function (fig) {
        var img = fig.querySelector('img');
        if (img.complete) place(fig); else img.addEventListener('load', function () { place(fig); }, { once: true });
      });
    }
  };
})();
