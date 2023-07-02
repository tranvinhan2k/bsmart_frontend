import { Avatar, Box, Grid, Stack, Typography } from '@mui/material';
import { formatISODateDateToDisplayDate } from '~/utils/date';
import { getGender } from '~/utils/common';
import { image } from '~/constants/image';
import { SX_BOX_ITEM_BG } from './style';
import {
  SX_FORM_ITEM_VALUE,
  SX_FORM_ITEM_LABEL,
  SX_PROFILE_TITLE_SUB,
  SX_PROFILE_TITLE,
  SX_WRAPPER,
} from '../style';
import { formatPhoneNumberVi } from '~/utils/phone';

interface BasicInfoProps {
  row: any;
}
export default function BasicInfo({ row }: BasicInfoProps) {
  const userAvatar =
    row.userImages.find((item: any) => item.type === 'AVATAR')?.url ??
    image.noAvatar;

  const tmpTitle = [
    { id: 0, label: 'Mail', value: row.email },
    {
      id: 1,
      label: 'Ngày sinh',
      value: formatISODateDateToDisplayDate(row.birthday),
    },
    { id: 2, label: 'Giới tính', value: getGender(row.gender) },
    { id: 3, label: 'SĐT', value: formatPhoneNumberVi(row.phone) },
  ];

  return (
    <Stack sx={SX_WRAPPER}>
      <Box p={2}>
        <Stack sx={SX_BOX_ITEM_BG}>
          <Box mt={{ xs: 10, sm: 23, md: 10 }}>
            <Avatar
              src={userAvatar}
              variant="rounded"
              sx={{
                width: 150,
                height: 150,
              }}
            />
          </Box>
          <Stack alignItems="center" mt={2}>
            <Typography sx={SX_PROFILE_TITLE}>Lưu Quang Nhật</Typography>
            <Typography sx={SX_PROFILE_TITLE_SUB}>Giáo viên</Typography>
          </Stack>
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
                <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
                <Typography sx={SX_FORM_ITEM_VALUE}>{item.value}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}
