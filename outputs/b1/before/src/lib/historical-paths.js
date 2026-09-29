// Match LegacyRedirectHandler's existing WordPress/feed cleanup exactly.
// These exceptions preserve history; they are not generic missing-page redirects.
export const isHistoricalPath = (path) => [
  /^\/feed$/, /^\/comments\/feed$/, /^\/blog\/feed$/,
  /\/feed\/rss2?$/, /^\/search(\/.*)?$/,
  /^\/wp-(admin|login|content|includes).*$/,
  /^\/category(\/.*)?$/, /^\/tag(\/.*)?$/,
  /^\/author(\/.*)?$/, /^\/attachment(\/.*)?$/,
].some(pattern => pattern.test(path));
