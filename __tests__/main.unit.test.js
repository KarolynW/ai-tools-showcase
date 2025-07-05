const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const { JSDOM } = require('jsdom');
const { setInitialTheme, setupToggle, setupMenu } = require('../scripts/main.js');

describe('main.js unit tests', () => {
  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><body><button id="theme-toggle"></button><nav><button id="menu-toggle"></button></nav></body>');
    global.document = dom.window.document;
    global.window = dom.window;
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
  });

  test('setInitialTheme adds dark-mode when user prefers dark', () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: true });
    setInitialTheme();
    expect(document.body.classList.contains('dark-mode')).toBe(true);
  });

  test('setInitialTheme does not add dark-mode when user prefers light', () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: false });
    setInitialTheme();
    expect(document.body.classList.contains('dark-mode')).toBe(false);
  });

  test('setupToggle toggles dark-mode on click', () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: false });
    setInitialTheme();
    setupToggle();
    const btn = document.getElementById('theme-toggle');
    btn.click();
    expect(document.body.classList.contains('dark-mode')).toBe(true);
  });

  test('setupMenu toggles nav open class on click', () => {
    setupMenu();
    const nav = document.querySelector('nav');
    const btn = document.getElementById('menu-toggle');
    btn.click();
    expect(nav.classList.contains('open')).toBe(true);
  });
});
