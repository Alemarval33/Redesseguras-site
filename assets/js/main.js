// ===== Menú móvil =====
const btn = document.getElementById('btnMenu');
const nav = document.getElementById('mainNav');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const visible = getComputedStyle(nav).display !== 'none';
    nav.style.display = visible ? 'none' : 'flex';
    btn.setAttribute('aria-expanded', (!visible).toString());
  });
}

// ===== Año en footer =====
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// ===== Reveal on scroll (si existen .reveal) =====
const toReveal = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && toReveal.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  toReveal.forEach(el => io.observe(el));
}

// ===== Hover Preview tipo MercadoLibre (solo desktop, sin click) =====
(function(){
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return; // no preview en móviles/touch

  const pane = document.getElementById('previewPane');
  if (!pane) return;
  const paneImg = pane.querySelector('img');

  // Config
  const OFFSET_X = 24; // separación lateral desde el cursor
  const OFFSET_Y = 16; // separación vertical desde el cursor
  const PANE_W = 520;
  const PANE_H = 360;

  // Delegación: solo imágenes dentro de la galería
  const gallery = document.querySelector('.gallery-3');
  if (!gallery) return;

  function showPane(src){
    paneImg.src = src;
    pane.style.display = 'block';
    pane.setAttribute('aria-hidden', 'false');
  }
  function hidePane(){
    pane.style.display = 'none';
    pane.setAttribute('aria-hidden', 'true');
    paneImg.removeAttribute('src');
  }
  function positionPane(mouseX, mouseY){
    const vw = window.innerWidth, vh = window.innerHeight;
    let left = mouseX + OFFSET_X;
    let top  = mouseY + OFFSET_Y;

    // Evitar que se salga por la derecha/abajo
    if (left + PANE_W > vw) left = mouseX - OFFSET_X - PANE_W;
    if (top + PANE_H > vh)  top  = mouseY - OFFSET_Y - PANE_H;
    // Evitar negativos
    if (left < 8) left = 8;
    if (top  < 8) top  = 8;

    pane.style.left = left + 'px';
    pane.style.top  = top  + 'px';
  }

  let currentTarget = null;

  gallery.addEventListener('mouseenter', (e) => {
    const img = e.target.closest('.card img');
    if (!img) return;
    currentTarget = img;
    showPane(img.currentSrc || img.src);
  }, true);

  gallery.addEventListener('mousemove', (e) => {
    const img = e.target.closest('.card img');
    if (!img) return;
    // Si cambia la imagen foco, actualizo el preview
    if (currentTarget !== img) {
      currentTarget = img;
      showPane(img.currentSrc || img.src);
    }
    positionPane(e.clientX, e.clientY);
  }, true);

  gallery.addEventListener('mouseleave', (e) => {
    hidePane();
    currentTarget = null;
  }, true);
})();
