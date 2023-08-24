import { Box, Typography } from '@mui/material';

export default function WithdrawRequestSectionGuide() {
  return (
    <>
      <Box mb={1}>
        <Typography>
          <b>Hướng dẫn</b>
        </Typography>
      </Box>
      <Box ml={0}>
        <Typography>Bước 1: Điểm đầy đủ thông tin</Typography>
        <Typography>
          Bước 2: Bấm <b>Gửi yêu cầu</b> để hoàn tất và chờ đợi quản trị viên xử
          lý yêu cầu
        </Typography>
      </Box>
      <Box mt={4} mb={1}>
        <Typography>
          <b>Lưu ý</b>
        </Typography>
      </Box>
      <Box ml={0}>
        <Typography>
          1. Thông tin không thể chỉnh sửa sau khi gửi yêu cầu. Xin hãy kiểm tra
          cẩn thận
        </Typography>
        <Typography>
          2. Nếu có bất kì sai sót nào vui lòng liên hệ với quản trị viên sớm
          nhất có thể
        </Typography>
      </Box>
    </>
  );
}
