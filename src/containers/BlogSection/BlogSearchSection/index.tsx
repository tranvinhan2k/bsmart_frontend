import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Link from '~/components/atoms/Link';
import {
  SX_WRAPPER,
  SX_CONTAINER,
  SX_FORM_SEARCH_INPUT,
  SX_OUTSTANDING_TITLE,
  SX_OUTSTANDING_POST_TITLE,
  SX_OUTSTANDING_POST_DATE,
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
                  <IconButton style={{ borderRadius: 0 }}>
                    <SearchIcon />
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
        <Link to="/blog">Kinh doanh</Link>
        <Link to="/blog">Khoa học</Link>
        <Link to="/blog">Giáo dục</Link>
        <Link to="/blog">Thiết kế đồ hoạ</Link>
        <Link to="/blog">Lập trình</Link>
        <Link to="/blog">Thiết kế web</Link>
      </Box>
      <Box sx={SX_CONTAINER}>
        <Typography component="h4" sx={SX_OUTSTANDING_TITLE}>
          Dòng thời gian
        </Typography>
        <Link to="/blog">Tháng 5, 2023</Link>
        <Link to="/blog">Tháng 6, 2023</Link>
        <Link to="/blog">Tháng 7, 2023</Link>
      </Box>
      <Box sx={SX_CONTAINER}>
        <Typography component="h4" sx={SX_OUTSTANDING_TITLE}>
          Lưu trữ
        </Typography>
        <Link to="/blog">Đăng ký</Link>
        <Link to="/blog">Đăng nhập</Link>
        <Link to="/blog">Entries feed</Link>
        <Link to="/blog">WordPress.org</Link>
      </Box>
    </Box>
  );
}
