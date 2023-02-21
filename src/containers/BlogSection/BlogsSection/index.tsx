import { Stack, Pagination } from '@mui/material';
import Blog from './Blog';

export default function BlogsSection() {
  return (
    <>
      <Blog />
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
