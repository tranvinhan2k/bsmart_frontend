import { blogList } from '~/constants/dataMocked';
import BlogDetailsBasicInfoSection from '~/containers/BlogDetailsSection/BlogDetailsBasicInfoSection';

export default function BlogDetailsPage() {
  const data = blogList[0];

  return <BlogDetailsBasicInfoSection item={data} />;
}
