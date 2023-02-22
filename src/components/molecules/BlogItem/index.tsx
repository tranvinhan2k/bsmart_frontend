import { Box, CardMedia, Stack, Grid, Typography } from '@mui/material';
import {
  SX_CARD_WRAPPER,
  SX_CARD_LIST_WRAPPER,
  SX_CARD_LIST_TEXT,
  SX_BLOG_TITTLE,
  SX_BLOG_CONTENT,
} from './style';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import { BlogPayload } from '~/models/blog';
import { formatDate } from '~/utils/date';
import { IconName } from '~/models/icon';

interface BlogItemProps {
  item: BlogPayload;
  onClick: () => void;
}
interface BlogTagProps {
  id: number;
  icon: IconName;
  tittle: string;
}

export default function BlogItem({ item, onClick }: BlogItemProps) {
  const { img, title, contentShort, tagAuthorName, tagDate, tagSummary } = item;
  const blogTags: BlogTagProps[] = [
    { id: 0, icon: 'person', tittle: tagAuthorName },
    { id: 1, icon: 'calendarMonth', tittle: formatDate(tagDate) },
    { id: 2, icon: 'search', tittle: tagSummary },
  ];

  const handleNavigateBlogDetail = () => {
    onClick();
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
            <Icon name={blogTag.icon} size="medium" color="orange" />
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
        onClick={handleNavigateBlogDetail}
      >
        Đọc thêm
      </Button>
    </Box>
  );
}
