import { createRequire } from 'node:module';
import path from 'node:path';

// Additional guard for legacy browser suites. Each existing route handler is
// wrapped so route.continue() cannot send external traffic or write requests.
const modules = 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const require = createRequire(path.join(modules, 'playwright', 'package.json'));
const { chromium } = require('playwright');
const launch = chromium.launch.bind(chromium);
chromium.launch = async (...args) => {
  const browser = await launch(...args);
  const newContext = browser.newContext.bind(browser);
  browser.newContext = async (...contextArgs) => {
    const context = await newContext(...contextArgs);
    const addRoute = context.route.bind(context);
    const safe = request => ['127.0.0.1', 'localhost', '[::1]'].includes(new URL(request.url()).hostname) && ['GET', 'HEAD'].includes(request.method());
    context.route = async (match, handler, options) => addRoute(match, async (route, request) => safe(request) ? handler(route, request) : route.abort(), options);
    await addRoute('**/*', route => safe(route.request()) ? route.continue() : route.abort());
    return context;
  };
  return browser;
};
