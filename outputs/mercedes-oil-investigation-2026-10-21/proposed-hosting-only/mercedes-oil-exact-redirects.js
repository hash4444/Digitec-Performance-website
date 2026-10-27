// REVIEW COPY ONLY. Not attached to a route, installed or deployed.
// Two logical rules: known legacy oil alias (two exact path forms) and
// the dedicated service trailing slash. Existing canonical ownership retained.
const redirects = new Map([
  ['/brands/mercedes-benz-service-dubai/oil-change', '/services/mercedes-oil-change-dubai'],
  ['/brands/mercedes-benz-service-dubai/oil-change/', '/services/mercedes-oil-change-dubai'],
  ['/services/mercedes-oil-change-dubai/', '/services/mercedes-oil-change-dubai'],
]);

export async function handleRequest(request, originFetch = fetch) {
  const url = new URL(request.url);
  if (!['GET', 'HEAD'].includes(request.method) || !['digitecme.com', 'www.digitecme.com'].includes(url.hostname)) return originFetch(request);
  const destinationPath = redirects.get(url.pathname);
  if (!destinationPath) return originFetch(request);
  const destination = new URL('https://digitecme.com');
  destination.pathname = destinationPath;
  destination.search = url.search;
  return Response.redirect(destination.href, 308);
}

export default { fetch(request) { return handleRequest(request); } };
