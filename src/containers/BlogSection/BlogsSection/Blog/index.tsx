import { Box, CardMedia, Stack, Grid, Typography } from '@mui/material';
import { blogTags } from '~/constants/mockData/blogTags';
import {
  SX_CARD_WRAPPER,
  SX_CARD_LIST_WRAPPER,
  SX_CARD_LIST_TEXT,
  SX_BLOG_TITTLE,
  SX_BLOG_CONTENT,
} from './style';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import { BlogPostProps } from '~/models/blog';

export default function Blog({ img, title, content }: BlogPostProps) {
  return (
    <Box sx={SX_CARD_WRAPPER}>
      <CardMedia sx={{ height: 400 }} image={img} title="green iguana" />
      <Box>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={SX_CARD_LIST_WRAPPER}
        >
          {blogTags.map((blogTag) => (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={2}
              key={blogTag.id}
            >
              <Icon name={blogTag.tagImgName} size="medium" color="orange" />
              <Typography component="h3" sx={SX_CARD_LIST_TEXT}>
                {blogTag.tagTittle}
              </Typography>
            </Stack>
          ))}
        </Grid>
        <Typography component="h2" sx={SX_BLOG_TITTLE}>
          {title}
        </Typography>
        <Typography component="h3" sx={SX_BLOG_CONTENT}>
          {content}
        </Typography>
      </Box>
      <Box>
        <Button customVariant="normal" fullWidth>
          Đọc thêm
        </Button>
      </Box>
    </Box>
  );
}
