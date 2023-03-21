import {
  Box,
  CardMedia,
  Stack,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { BlogPayload, BlogTagProps } from '~/models/blog';
import { formatDate } from '~/utils/date';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import {
  SX_CARD_WRAPPER,
  SX_CARD_LIST_WRAPPER,
  SX_CARD_LIST_TEXT,
  SX_BLOG_TITTLE,
  SX_BLOG_COMMENT_TITLE,
  SX_BLOG_COMMENT_NOTE,
} from './style';

interface BlogDetailsBasicInfoSectionProps {
  item: BlogPayload;
}

export default function BlogDetailsBasicInfoSection({
  item,
}: BlogDetailsBasicInfoSectionProps) {
  const {
    // id,
    img,
    tagAuthorName,
    tagDate,
    tagSummary,
    title,
    // contentShort,
    content,
  } = item;

  const blogTags: BlogTagProps[] = [
    { id: 0, icon: 'person', tittle: tagAuthorName },
    { id: 1, icon: 'calendarMonth', tittle: formatDate(tagDate) },
    { id: 2, icon: 'search', tittle: tagSummary },
  ];

  return (
    <>
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
        <Typography>{content}</Typography>
      </Box>
      <Typography component="h4" sx={SX_BLOG_COMMENT_TITLE}>
        Để lại bình luận
      </Typography>
      <Typography component="p" sx={SX_BLOG_COMMENT_NOTE}>
        Tất cả các trường được đánh dấu hoa thị (*) là bắt buộc
      </Typography>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              required
              placeholder="Họ và tên"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth size="small" required placeholder="Gmail" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth size="small" required placeholder="SĐT" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={4}
              required
              placeholder="Vui lòng ghi bình luận của bạn ở đây"
            />
          </Grid>
          <Grid item xs={12}>
            <Button customVariant="normal">Đăng bình luận</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
