import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Stack,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Link from '~/components/atoms/Link';
import Icon from '~/components/atoms/Icon';
import {
  blogSearchCategories,
  blogSearchTimelines,
  blogSearchStorages,
} from '~/constants/blog';
import {
  SX_WRAPPER,
  SX_CONTAINER,
  SX_FORM_SEARCH_INPUT,
  SX_OUTSTANDING_TITLE,
  SX_OUTSTANDING_POST_TITLE,
  SX_OUTSTANDING_POST_DATE,
  SX_FORM_SEARCH_INPUT_ICON_BUTTON,
  SX_FORM_SEARCH_INPUT_ICON,
} from './style';

export default function BlogSearchSection() {
  return (
    <Box sx={SX_WRAPPER}>
      <Box sx={SX_CONTAINER}>
        <FormControl size="small" fullWidth>
          <TextField
            placeholder="Tìm kiếm chủ đề..."
            size="small"
            sx={SX_FORM_SEARCH_INPUT}
            InputProps={{
              sx: { padding: 0 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton sx={SX_FORM_SEARCH_INPUT_ICON_BUTTON}>
                    <SearchIcon sx={SX_FORM_SEARCH_INPUT_ICON} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Box>
      <Box sx={SX_CONTAINER}>
        <Typography component="h4" sx={SX_OUTSTANDING_TITLE}>
          Bài viết gần đây
        </Typography>
        <Link to="/blog">
          Tìm hiểu phát triển ứng dụng web từ các chuyên gia
        </Link>
        <Typography component="p" sx={SX_OUTSTANDING_POST_DATE}>
          12/30/2023
        </Typography>
      </Box>
      <Box sx={SX_CONTAINER}>
        <Typography component="h4" sx={SX_OUTSTANDING_TITLE}>
          Thể loại
        </Typography>
        {blogSearchCategories.map((blogSearchCategory) => (
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            key={blogSearchCategory.id}
          >
            <Icon name="keyboardArrowRight" size="medium" color="tertiary" />
            <Link to="/blog">{blogSearchCategory.name}</Link>
          </Stack>
        ))}
      </Box>
      <Box sx={SX_CONTAINER}>
        <Typography component="h4" sx={SX_OUTSTANDING_TITLE}>
          Dòng thời gian
        </Typography>
        {blogSearchTimelines.map((blogSearchTimeline) => (
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            key={blogSearchTimeline.id}
          >
            <Icon name="keyboardArrowRight" size="medium" color="tertiary" />
            <Link to="/blog">{blogSearchTimeline.name}</Link>
          </Stack>
        ))}
      </Box>
      <Box sx={SX_CONTAINER}>
        <Typography component="h4" sx={SX_OUTSTANDING_TITLE}>
          Lưu trữ
        </Typography>
        {blogSearchStorages.map((blogSearchStorage) => (
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            key={blogSearchStorage.id}
          >
            <Icon name="keyboardArrowRight" size="medium" color="tertiary" />
            <Link to="/blog">{blogSearchStorage.name}</Link>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
