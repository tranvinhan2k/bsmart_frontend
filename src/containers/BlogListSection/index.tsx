import { Stack, Pagination } from '@mui/material';
import { blogList } from '~/constants/mockData/blogList';
import BlogItem from '~/components/molecules/BlogItem';

export default function BlogListSection() {
  return (
    <>
      {blogList.map((item) => (
        <BlogItem key={item.id} item={item} />
      ))}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        padding={2}
      >
        <Pagination count={10} />
      </Stack>
    </>
  );
}
