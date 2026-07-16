import { useParams } from 'react-router-dom';
import BlogPost from '@/pages/BlogPost';
import BrandWorkshopArticlePage from '@/pages/BrandWorkshopArticlePage';
import { getBrandWorkshopArticle } from '@/data/brandWorkshopArticles';

const BlogArticleRouter = () => {
  const { slug } = useParams<{ slug: string }>();
  return slug && getBrandWorkshopArticle(slug) ? <BrandWorkshopArticlePage /> : <BlogPost />;
};

export default BlogArticleRouter;
