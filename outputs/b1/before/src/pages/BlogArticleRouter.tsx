import { useParams } from 'react-router-dom';
import BlogPost from '@/pages/BlogPost';
import BrandWorkshopArticlePage from '@/pages/BrandWorkshopArticlePage';
import { getBrandWorkshopArticle } from '@/data/brandWorkshopArticles';
import MercedesModelPage from '@/pages/MercedesModelPage';
import { getMercedesModelByLegacyBlogSlug } from '@/data/mercedesModelPages';
import { useLocale } from '@/i18n/use-locale';
import PorscheModelPage from '@/pages/PorscheModelPage';
import { getPorscheModelByLegacyBlogSlug } from '@/data/porscheModelPages';
import PorscheGuidesIndex from '@/pages/PorscheGuidesIndex';

const BlogArticleRouter = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isArabic } = useLocale();
  if (!isArabic && slug === 'porsche-maintenance-guide-dubai') return <PorscheGuidesIndex />;
  if (!isArabic && slug && getPorscheModelByLegacyBlogSlug(slug)) return <PorscheModelPage />;
  if (!isArabic && slug && getMercedesModelByLegacyBlogSlug(slug)) return <MercedesModelPage />;
  return slug && getBrandWorkshopArticle(slug) ? <BrandWorkshopArticlePage /> : <BlogPost />;
};

export default BlogArticleRouter;
