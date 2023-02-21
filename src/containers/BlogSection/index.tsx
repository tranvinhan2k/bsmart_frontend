import { Box, Grid } from '@mui/material';
import BlogsSection from './BlogsSection/index';
import BlogSearchSection from './BlogSearchSection';
import { SX_WRAPPER, SX_CONTAINER } from './style';

export default function BlogSection() {
  return (
    <Box sx={SX_WRAPPER}>
      <Box sx={SX_CONTAINER}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          rowSpacing={{ xs: 10, md: 0 }}
          columnSpacing={{ xs: 0, md: 10 }}
        >
          <Grid item xs={12} md={8}>
            <BlogsSection />
          </Grid>
          <Grid item xs={12} md={4}>
            <BlogSearchSection />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
