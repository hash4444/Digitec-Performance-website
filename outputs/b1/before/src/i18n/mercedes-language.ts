// The old Arabic blog renderer supplies generic templates, not translations of
// these model pages. Keep it out of search/alternate declarations until real
// equivalent model content is available; direct language navigation to the hub.
export const MERCEDES_UNTRANSLATED_MODEL_PATHS = new Set([
  '/blog/mercedes-g63-service-dubai-guide',
  '/blog/mercedes-c-class-service-dubai-guide',
  '/blog/mercedes-e-class-service-dubai-guide',
  '/blog/mercedes-s-class-service-dubai-guide',
]);

export const isEnglishMercedesModelPath = (path: string) =>
  path.startsWith('/mercedes/models/') || MERCEDES_UNTRANSLATED_MODEL_PATHS.has(path);
