import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Inspect the shipped initial HTML independently of the metadata resolver.
// This catches relative image URLs, stale generic article previews, missing
// article dates, and inconsistent social tags before a release is deployed.
const root = process.cwd();
const origin = 'https://digitecme.com';
const { getPublicRoutes } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href);
const routes = getPublicRoutes();
const decode = (value) => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
let articles = 0;
let localImages = 0;
const checkedImages = new Set();

for (const route of routes) {
  const canonical = `${origin}${route.path}`;
  const html = await readFile(path.join(root, 'dist', route.path.replace(/^\//, ''), 'index.html'), 'utf8');
  const head = html.split('</head>')[0];
  const metadata = (name) => [...head.matchAll(/<meta\b[^>]*>/gi)]
    .filter(([tag]) => tag.match(/\b(?:name|property)="([^"]+)"/i)?.[1] === name)
    .map(([tag]) => decode(tag.match(/\bcontent="([^"]*)"/i)?.[1] ?? ''));
  const one = (name) => {
    const values = metadata(name);
    assert.equal(values.length, 1, `${route.path}: expected one ${name}`);
    return values[0];
  };
  const image = one('og:image');
  assert.match(image, /^https:\/\//, `${route.path}: social image needs an absolute HTTPS URL`);
  assert.equal(one('twitter:image'), image, `${route.path}: social image mismatch`);
  const imageUrl = new URL(image);
  if (imageUrl.origin === origin && !checkedImages.has(image)) {
    await access(path.join(root, 'dist', decodeURIComponent(imageUrl.pathname)));
    checkedImages.add(image);
    localImages++;
  }

  const documents = [...head.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(([, value]) => JSON.parse(value));
  const nodes = documents.flatMap((document) => document['@graph'] ?? document);
  const article = nodes.find((node) => {
    const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
    return types.some((type) => ['Article', 'BlogPosting', 'NewsArticle'].includes(type))
      && (node.url === canonical || node['@id'] === `${canonical}#article`);
  });
  if (article) {
    articles++;
    assert.equal(one('og:type'), 'article', `${route.path}: article has a generic website preview`);
    for (const [property, field] of [['published_time', 'datePublished'], ['modified_time', 'dateModified']]) {
      assert.deepEqual(metadata(`article:${property}`), article[field] ? [article[field]] : [], `${route.path}: article date must match its published graph`);
    }
    const primaryImage = nodes.find((node) => node['@id'] === `${canonical}#webpage`)?.primaryImageOfPage ?? article.image;
    const declaredImage = typeof primaryImage === 'string' ? primaryImage : primaryImage?.contentUrl ?? primaryImage?.url;
    if (declaredImage && !declaredImage.endsWith('/images/hero-bg.png')) {
      assert.notEqual(image, `${origin}/images/hero-bg.png`, `${route.path}: existing article image was replaced by the homepage preview`);
    }
  } else {
    assert.deepEqual(metadata('article:published_time'), [], `${route.path}: stale article publication date`);
    assert.deepEqual(metadata('article:modified_time'), [], `${route.path}: stale article update date`);
  }
}

console.log(`Social metadata validation passed: ${routes.length} routes, ${articles} articles and ${localImages} existing local images.`);
