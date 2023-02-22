import { blogList } from '~/constants/mockData/blogList';
import BlogDetailsBasicInfoSection from '~/containers/BlogDetailsSection/BlogDetailsBasicInfoSection';

export default function BlogDetailsPage() {
  const data = blogList[0];

  return <BlogDetailsBasicInfoSection item={data} />;
}
