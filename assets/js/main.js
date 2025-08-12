// Respeta el sistema; permite override con el botón
(function initTheme(){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme'); // 'light' | 'dark' | null
  if(saved === 'dark'){ root.classList.add('dark'); }
  if(saved === 'light'){ root.classList.remove('dark'); }
})();

document.getElementById('themeToggle')?.addEventListener('click', () => {
  const root = document.documentElement;
  const isDark = root.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
