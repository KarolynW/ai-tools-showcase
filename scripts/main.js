// Toggle dark mode based on user preference and button click
function setInitialTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.body.classList.add('dark-mode');
  }
}

function setupToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
}

function setupMenu() {
  const nav = document.querySelector('nav');
  const toggle = document.getElementById('menu-toggle');
  if (!nav || !toggle) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    setInitialTheme();
    setupToggle();
    setupMenu();
  });
}

if (typeof module !== "undefined") { module.exports = { setInitialTheme, setupToggle, setupMenu }; }

