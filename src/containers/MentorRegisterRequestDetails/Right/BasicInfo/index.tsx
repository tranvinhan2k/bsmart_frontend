import { Grid, Typography, Stack } from '@mui/material';
import { SX_FORM_ITEM_LABEL_BOLD, SX_FORM_ITEM_LABEL_LIGHT } from './style';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_LABEL,
} from '~/containers/MentorRegisterRequestDetails/Right/style';

interface BasicInfoProps {
  mentorRequest: any;
}
export default function BasicInfo({ mentorRequest }: BasicInfoProps) {
  const tmpTitle = [
    { id: 0, label: 'Mail', value: mentorRequest.mail },
    { id: 1, label: 'Tên', value: mentorRequest.name },
    { id: 2, label: 'Ngày sinh', value: mentorRequest.birthday },
    { id: 4, label: 'Giới tính', value: mentorRequest.gender },
    { id: 3, label: 'Chứng minh thư', value: mentorRequest.idCard },
    { id: 5, label: 'SĐT', value: mentorRequest.phone },
  ];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid mb={4} container>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>Thông tin chung</Typography>
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
              <Grid item xs={6} key={item.id}>
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
        </Grid>
      </Grid>
    </Stack>
  );
}
