const fs = require('fs');
const path = require('path');
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const { JSDOM } = require('jsdom');

const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

const scriptPath = path.join(__dirname, '..', 'scripts', 'main.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

function createDom() {
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
  dom.window.matchMedia = () => ({ matches: false });
  const scriptEl = dom.window.document.createElement('script');
  scriptEl.textContent = scriptContent;
  dom.window.document.body.appendChild(scriptEl);
  return dom;
}

describe('site integration', () => {
  test('navigation and theme toggle work together', () => {
    const dom = createDom();
    const { document } = dom.window;
    const themeBtn = document.getElementById('theme-toggle');
    const menuBtn = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');

    // simulate DOMContentLoaded
    dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded', { bubbles: true }));

    // test theme toggle
    themeBtn.click();
    expect(document.body.classList.contains('dark-mode')).toBe(true);

    // test menu toggle
    menuBtn.click();
    expect(nav.classList.contains('open')).toBe(true);
  });
});
