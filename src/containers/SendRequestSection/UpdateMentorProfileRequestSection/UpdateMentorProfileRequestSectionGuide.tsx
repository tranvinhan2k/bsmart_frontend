import { Box, Typography } from '@mui/material';

export default function UpdateMentorProfileRequestSectionGuide() {
  return (
    <>
      <Box mb={1}>
        <Typography>
          <b>Hướng dẫn</b>
        </Typography>
      </Box>
      <Box ml={0}>
        <Typography>Bước 1: Cập nhật thông tin mới</Typography>
        <Typography>
          Bước 2: Bấm <b>Lưu lại</b> để lưu hồ sơ mới lại
        </Typography>
        <Typography>
          Bước 3: Kiểm tra lại thông tin, có thể chỉnh sửa nhiều lần trước khi
          gửi
        </Typography>
        <Typography>
          Bước 4: Bấm <b>Gửi yêu cầu</b> để hoàn tất và chờ đợi quản trị viên xử
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
          1. Hồ sơ cũ vẫn sẽ tiếp tục được sử dụng để hiển thị cho đến khi nào
          hồ sơ mới được quản trị viên phê duyệt
        </Typography>
      </Box>
    </>
  );
}
