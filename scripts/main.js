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

document.addEventListener('DOMContentLoaded', () => {
  setInitialTheme();
  setupToggle();
});
