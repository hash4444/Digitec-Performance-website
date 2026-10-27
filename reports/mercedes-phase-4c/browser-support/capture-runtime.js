/* Phase 4C loopback response instrumentation only; never shipped or written into dist. */
(function () {
  'use strict';
  const config = JSON.parse(document.currentScript.dataset.config);
  const session = new URL(location.href).searchParams.get('__qa_session') || config.session;
  const startedAt = new Date().toISOString();
  let sequence = 0;
  const events = [];
  function value(input) {
    if (input instanceof Error) return { name: input.name, message: input.message, stack: input.stack || null };
    if (typeof input === 'string') return input.slice(0, 16000);
    try { return JSON.parse(JSON.stringify(input)); } catch { return String(input).slice(0, 16000); }
  }
  function state() {
    const node = document.activeElement;
    return {
      url: location.href, path: location.pathname, hash: location.hash, title: document.title,
      readyState: document.readyState, width: innerWidth, height: innerHeight,
      clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth,
      rootPresent: !!document.getElementById('root'), bodyPresent: !!document.body,
      active: node ? { tag: node.tagName, label: (node.textContent || '').trim().slice(0, 200), href: node.getAttribute('href') } : null,
      scripts: Array.from(document.scripts).map(script => ({ src: script.src || null, type: script.type || null, qa: script.hasAttribute('data-phase4c-qa') })),
      resources: performance.getEntriesByType('resource').filter(entry => /\.(js|css)(?:\?|$)/.test(entry.name)).map(entry => ({ name: entry.name, startTime: entry.startTime, duration: entry.duration }))
    };
  }
  function send(kind, detail) {
    const entry = { sequence: ++sequence, clientAt: new Date().toISOString(), performanceMs: performance.now(), startedAt, session, option: config.option, mode: config.mode, kind, detail, state: state() };
    events.push(entry);
    if (events.length > 400) events.shift();
    // Local loopback only. Keepalive carries a late unload error without blocking navigation.
    fetch('/__phase4c/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry), keepalive: true }).catch(() => {});
    const output = document.getElementById('phase4c-diagnostic-output');
    if (output) output.textContent = JSON.stringify({ option: config.option, mode: config.mode, session, events: events.slice(-8) }, null, 2);
    if (parent !== window) parent.postMessage({ phase4cDiagnostic: entry }, location.origin);
  }
  Object.defineProperty(window, '__phase4cDiagnostics', { value: { config, events, state }, configurable: false });
  addEventListener('error', event => send(event.error || event.message ? 'window-error' : 'resource-error', {
    message: event.message || null, filename: event.filename || null, line: event.lineno || null, column: event.colno || null,
    error: value(event.error), target: event.target && { tag: event.target.tagName, src: event.target.src || event.target.href || null }
  }), true);
  addEventListener('unhandledrejection', event => send('unhandled-rejection', { reason: value(event.reason) }));
  addEventListener('securitypolicyviolation', event => send('csp-block', { blockedURI: event.blockedURI, directive: event.effectiveDirective, sourceFile: event.sourceFile, line: event.lineNumber, column: event.columnNumber }));
  for (const level of ['error', 'warn']) {
    const original = console[level];
    console[level] = function (...args) { send('console-' + level, { args: args.map(value), callerStack: new Error('QA console capture').stack }); return Reflect.apply(original, this, args); };
  }
  // Optional second-pass diagnostic only: observes arguments and rethrows the native exception.
  // Default passive mode does not modify MutationObserver or route/history behavior.
  if (config.mode === 'observe-probe') {
    const nativeObserve = MutationObserver.prototype.observe;
    MutationObserver.prototype.observe = function (target, options) {
      const detail = { targetType: target === null ? 'null' : typeof target, constructor: target && target.constructor && target.constructor.name, isNode: target instanceof Node, callerStack: new Error('QA MutationObserver.observe call').stack };
      if (!detail.isNode) send('observe-invalid-target', detail);
      try { return Reflect.apply(nativeObserve, this, [target, options]); }
      catch (error) { send('observe-native-exception', { ...detail, error: value(error) }); throw error; }
    };
  }
  document.addEventListener('click', event => {
    const anchor = event.target.closest && event.target.closest('a[href]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    const detail = { href, label: anchor.textContent.trim(), placement: anchor.getAttribute('data-cta-placement') };
    if (/^(tel:|mailto:|https:\/\/(wa\.me|api\.whatsapp\.com))/.test(href)) {
      event.preventDefault();
      // Capture only; no native call, messaging window, form submit or analytics send.
      let output = document.getElementById('phase4-contact-output');
      if (!output) { output = document.createElement('output'); output.id = 'phase4-contact-output'; output.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:2147483647;background:white;color:black;font:12px monospace;max-height:100px;overflow:auto;padding:8px;border:2px solid #e85011'; document.body.append(output); }
      output.textContent = 'QA CONTACT INTERCEPTED: ' + JSON.stringify(detail);
      send('contact-intercept', detail);
      if (parent !== window) parent.postMessage({ phase4Contact: detail }, location.origin);
    } else send('anchor-click', detail);
  }, true);
  function measure(kind) {
    const active = document.activeElement;
    const style = active && getComputedStyle(active);
    const current = state();
    const detail = { ...current, focus: active ? { tag: active.tagName, text: (active.textContent || '').trim().slice(0, 180), href: active.getAttribute('href'), focusVisible: active.matches(':focus-visible'), outline: style.outline, boxShadow: style.boxShadow, rect: active.getBoundingClientRect().toJSON() } : null };
    send(kind, detail);
    if (parent !== window) parent.postMessage({ phase4Ui: detail }, location.origin);
  }
  addEventListener('DOMContentLoaded', () => measure('dom-content-loaded'));
  addEventListener('load', () => measure('window-load'));
  addEventListener('pageshow', event => send('page-show', { persisted: event.persisted }));
  addEventListener('pagehide', event => send('page-hide', { persisted: event.persisted }));
  addEventListener('popstate', () => measure('pop-state'));
  addEventListener('hashchange', () => measure('hash-change'));
  addEventListener('resize', () => measure('resize'));
  document.addEventListener('focusin', () => measure('focus-in'));
  send('instrumentation-installed', { userAgent: navigator.userAgent, language: navigator.language, build: config.build, note: 'Installed as first head child before app and analytics; QA responses only.' });
})();
