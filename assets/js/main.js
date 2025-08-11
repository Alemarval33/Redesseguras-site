// Menú móvil
const btn = document.getElementById('btnMenu');
const nav = document.getElementById('mainNav');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const visible = getComputedStyle(nav).display !== 'none';
    nav.style.display = visible ? 'none' : 'flex';
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
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
