import {
  Avatar,
  Box,
  Grid,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import { formatISODateDateToDisplayDate } from '~/utils/date';
import { getGender } from '~/utils/common';
import { image } from '~/constants/image';
import Icon from '~/components/atoms/Icon';
import { handleCopyToClipboard } from '~/utils/commonComp';
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
    {
      id: -1,
      label: 'Họ tên',
      value: row.fullName,
      valueDisplay: row.fullName,
      isCopyable: true,
    },
    {
      id: 0,
      label: 'Mail',
      value: row.email,
      valueDisplay: row.email,
      isCopyable: true,
    },
    {
      id: 1,
      label: 'SĐT',
      value: row.phone,
      valueDisplay: formatPhoneNumberVi(row.phone),
      isCopyable: true,
    },
    {
      id: 2,
      label: 'Ngày sinh',
      value: row.birthday,
      valueDisplay: formatISODateDateToDisplayDate(row.birthday),
      isCopyable: false,
    },
    {
      id: 3,
      label: 'Giới tính',
      value: row.gender,
      valueDisplay: getGender(row.gender),
      isCopyable: false,
    },
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
            <Typography sx={SX_PROFILE_TITLE}>Giáo viên</Typography>
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
                alignItems="center"
              >
                <Typography sx={SX_FORM_ITEM_LABEL}>{item.label}:</Typography>
                <Typography sx={SX_FORM_ITEM_VALUE}>
                  {item.isCopyable && (
                    <IconButton
                      size="small"
                      onClick={() => handleCopyToClipboard(item.value)}
                    >
                      <Icon
                        name="contentCopyIcon"
                        size="small_20"
                        color="blue"
                      />
                    </IconButton>
                  )}
                  {item.valueDisplay}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}
