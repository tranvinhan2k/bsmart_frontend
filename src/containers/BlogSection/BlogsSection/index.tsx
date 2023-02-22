import { Stack, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BlogItem from '~/components/molecules/BlogItem';
import { blogList } from '~/constants/mockData/blogList';

export default function BlogsSection() {
  const navigation = useNavigate();

  const handleNavigateBlogDetail = (id: string) => {
    navigation(`blog-detail/${id}`);
  };

  return (
    <>
      {blogList.map((item) => (
        <BlogItem
          key={item.id}
          item={item}
          onClick={() => handleNavigateBlogDetail(`${item.id}`)}
        />
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
