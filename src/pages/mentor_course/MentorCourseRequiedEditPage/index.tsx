import { Stack, Typography, Box } from '@mui/material';
import Button from '~/components/atoms/Button';
import globalStyles from '~/styles';

export default function MentorCourseRequiedEditPage() {
  return (
    <Stack>
      <Typography
        sx={globalStyles.textSmallLight}
        dangerouslySetInnerHTML={{
          __html: `<p dir="ltr">Ch&agrave;o <strong>Nhật</strong>,&nbsp;</p>
          <p dir="ltr">Ch&uacute;ng t&ocirc;i đ&atilde; xem x&eacute;t kh&oacute;a học của bạn v&agrave; ph&aacute;t hiện một số chỗ chưa hợp lệ.</p>
          <p dir="ltr"><strong>Hướng dẫn 1. H&igrave;nh ảnh chưa hợp lệ.</strong></p>
          <p dir="ltr">H&igrave;nh ảnh bạn để v&agrave;o lớp học m&atilde; số #034 chưa ph&ugrave; hợp với hệ thống. Vui l&ograve;ng gỡ bỏ h&igrave;nh ảnh v&agrave; thay bằng h&igrave;nh ảnh kh&aacute;c.</p>
          <p dir="ltr"><strong>Hướng dẫn 2. Thời gian mở lớp kh&ocirc;ng hợp l&iacute;.&nbsp;</strong></p>
          <p dir="ltr">Thời gian của bạn mở lớp tr&ugrave;ng với dịp lễ Tết Nguy&ecirc;n Đ&aacute;n. Hệ thống hiện tại chưa hỗ trợ việc mở lớp v&agrave;o ng&agrave;y Lễ .Vui l&ograve;ng chỉnh sửa thời gian mở lớp.</p>
          `,
        }}
      />
      <Typography sx={globalStyles.textLowSmallLight}>
        Vui lòng phản hồi nếu bạn cảm thấy yêu cầu bên phía hệ thống chưa hợp lí
      </Typography>
      <Box marginTop={1}>
        <Button variant="contained">Phản hồi</Button>
      </Box>
    </Stack>
  );
}
