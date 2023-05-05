import { Box, Grid, Typography, Stack } from '@mui/material';
import image from '~/assets/images/MemberDetailSection/avatar_member.jpg';
import {
  SX_BOX_ITEM_AVATAR,
  SX_BOX_ITEM_BG,
  SX_PROFILE_TITLE_SUB,
  SX_PROFILE_TITLE,
  SX_WRAPPER,
} from './style';
import {
  SX_FORM_ITEM_LABEL_BOLD,
  SX_FORM_ITEM_LABEL_LIGHT,
} from '~/containers/MentorCreateCourseRequestDetails/style';

interface MentorRegisterRequestDetailsLeftProps {
  mentorRequest: any;
}

export default function MentorRegisterRequestDetailsLeft({
  mentorRequest,
}: MentorRegisterRequestDetailsLeftProps) {
  const tmpTitle = [
    { id: 0, label: 'Mail', value: mentorRequest.mail },
    { id: 1, label: 'Ngày sinh', value: mentorRequest.birthday },
    { id: 2, label: 'Giới tính', value: mentorRequest.gender },
    { id: 3, label: 'CMND', value: mentorRequest.idCard },
    { id: 4, label: 'SĐT', value: mentorRequest.phone },
  ];

  return (
    <Stack sx={SX_WRAPPER}>
      <Box p={2}>
        <Stack sx={SX_BOX_ITEM_BG}>
          <Box
            sx={SX_BOX_ITEM_AVATAR}
            component="img"
            alt="mentorRequest avatar"
            src={image}
            mt={{ sm: 22, md: 0 }}
          />
          <Stack alignItems="center" mt={2}>
            <Typography sx={SX_PROFILE_TITLE}>Lưu Quang Nhật</Typography>
            <Typography sx={SX_PROFILE_TITLE_SUB}>Giáo viên</Typography>
          </Stack>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            columnSpacing={8}
            rowSpacing={2}
            mt={1}
          >
            {tmpTitle.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Typography sx={SX_FORM_ITEM_LABEL_BOLD}>
                    {item.label}:
                  </Typography>
                  <Typography sx={SX_FORM_ITEM_LABEL_LIGHT}>
                    {item.value}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>
    </Stack>
  );
}
