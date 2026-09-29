type ArticleSummary = { slug: string; title: string; category: string };

const genericWords = new Set(['a', 'an', 'and', 'are', 'at', 'before', 'best', 'car', 'cars', 'complete', 'dubai', 'for', 'guide', 'how', 'in', 'is', 'it', 'of', 'or', 'owner', 'owners', 'service', 'the', 'to', 'uae', 'what', 'with', 'your']);
const topicWords = (title: string) => new Set(title.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word && !genericWords.has(word)));

/** Match the source-language topic before localization, with stable ordering for ties. */
export const getRelatedArticles = <T extends ArticleSummary>(article: ArticleSummary, candidates: T[], limit = 2): T[] => {
  const words = topicWords(article.title);
  const ranked = candidates
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate, index) => ({
      candidate,
      index,
      score: [...topicWords(candidate.title)].filter((word) => words.has(word)).length * 4 + Number(candidate.category === article.category),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);
  const topicalMatches = ranked.filter(({ score }) => score >= 4);
  return (topicalMatches.length ? topicalMatches : ranked)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
};
