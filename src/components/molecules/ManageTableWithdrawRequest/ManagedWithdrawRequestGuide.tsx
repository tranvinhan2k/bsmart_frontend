import { Box, colors, Grid, Stack, Typography } from '@mui/material';

export default function ManagedWithdrawRequestGuide() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={8}>
        <Box mb={1}>
          <Typography>
            <b>Hướng dẫn</b>
          </Typography>
        </Box>
        <Box ml={0}>
          <Typography>
            Bước 1: Bấm <b>XUẤT DANH SÁCH</b> để tải danh sách yêu cầu cần xử lý
          </Typography>
          <Typography>
            Bước 2: Xử lý yêu cầu bằng cách thay đổi trạng thái của cột{' '}
            <b>STATUS</b> (Trạng thái)
          </Typography>
          <Typography>
            Bước 3: Sau khi hoàn tất thay đổi, bấm <b>NHẬP DANH SÁCH</b> để gửi
            lại danh sách đã xử lý
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Box mb={1}>
          <Typography>
            <b>Phân loại trạng thái</b>
          </Typography>
        </Box>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            ml={0}
          >
            <Typography sx={{ color: colors.green[500] }}>
              <b>SUCCESS</b>
            </Typography>
            <Typography sx={{ color: colors.red[500] }}>
              <b>FAIL</b>
            </Typography>
          </Stack>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            ml={0}
          >
            <Typography>:</Typography>
            <Typography>:</Typography>
          </Stack>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            ml={0}
          >
            <Typography>Xử lý thành công</Typography>
            <Typography>Xử lý thất bại</Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
