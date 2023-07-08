import { Box, CardMedia, Stack, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BlogPayload, BlogTagProps } from '~/models/blog';
import { formatDate } from '~/utils/date';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import {
  SX_CARD_WRAPPER,
  SX_CARD_LIST_WRAPPER,
  SX_CARD_LIST_TEXT,
  SX_BLOG_TITTLE,
  SX_BLOG_CONTENT,
} from './style';

interface BlogItemProps {
  item: BlogPayload;
}

export default function BlogItem({ item }: BlogItemProps) {
  const {
    id,
    img,
    tagAuthorName,
    tagDate,
    tagSummary,
    title,
    contentShort,
    // content,
  } = item;

  const blogTags: BlogTagProps[] = [
    { id: 0, icon: 'person', tittle: tagAuthorName },
    { id: 1, icon: 'calendarMonth', tittle: formatDate(tagDate) },
    { id: 2, icon: 'search', tittle: tagSummary },
  ];

  const navigation = useNavigate();
  const handleNavigateBlogDetails = () => {
    navigation(`blog-details/${id}`);
  };

  return (
    <Box sx={SX_CARD_WRAPPER}>
      <CardMedia sx={{ height: 400 }} image={img} title="green iguana" />
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
            <Icon name={blogTag.icon} size="medium" color="tertiary" />
            <Typography component="h3" sx={SX_CARD_LIST_TEXT}>
              {blogTag.tittle}
            </Typography>
          </Stack>
        ))}
      </Grid>
      <Typography component="h2" sx={SX_BLOG_TITTLE}>
        {title}
      </Typography>
      <Typography component="h3" sx={SX_BLOG_CONTENT}>
        {contentShort}
      </Typography>
      <Button
        customVariant="normal"
        fullWidth
        onClick={handleNavigateBlogDetails}
      >
        Đọc thêm
      </Button>
    </Box>
  );
}
