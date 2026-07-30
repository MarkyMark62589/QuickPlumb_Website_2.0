/* QuickPlumb Website 2.0 — minimal progressive enhancement */
(function () {
  var b = document.getElementById('burger'),
      n = document.getElementById('nav');
  if (b && n) {
    b.addEventListener('click', function () {
      var open = n.classList.toggle('open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    n.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { n.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); }
    });
  }
  var y = document.getElementById('yr');
  if (y) y.textContent = new Date().getFullYear();
})();
