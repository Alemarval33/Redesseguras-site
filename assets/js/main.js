// Menú móvil
const btn = document.getElementById('btnMenu');
const nav = document.getElementById('mainNav');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const visible = getComputedStyle(nav).display !== 'none';
    nav.style.display = visible ? 'none' : 'flex';
    btn.setAttribute('aria-expanded', (!visible).toString());
  });
}

// Año en footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Reveal on scroll
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

// Lightbox simple para la galería
(function(){
  const imgs = document.querySelectorAll('.gallery-grid img');
  if (!imgs.length) return;
  imgs.forEach(img => {
    img.addEventListener('click', () => {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || '';
      const overlay = document.createElement('div');
      overlay.className = 'lightbox-backdrop fade-in';
      overlay.innerHTML = '<img class="lightbox-img" src="'+src+'" alt="'+alt+'">';
      const close = () => {
        document.removeEventListener('keydown', onKey);
        overlay.remove();
      };
      const onKey = (e) => { if (e.key === 'Escape') close(); };
      overlay.addEventListener('click', close);
      document.addEventListener('keydown', onKey);
      document.body.appendChild(overlay);
    });
  });
})();
