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

// Suavizar scroll para anclas
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (getComputedStyle(nav).position === 'absolute') {
          nav.style.display = 'none';
          btn.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });
});

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
