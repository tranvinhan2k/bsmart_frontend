import {
  Avatar,
  Button as MuiButton,
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
import { useGetCourseCreateRequestDetails } from '~/hooks/course/useGetCourseCreateRequestDetails';
import { FontFamily } from '~/assets/variables';

interface BasicInfoProps {
  row: any;
}
export default function BasicInfo({ row }: BasicInfoProps) {
  const userAvatar = image.noAvatar;

  const idCourse = row.id;
  const { courseCreateRequestDetails, isLoading } =
    useGetCourseCreateRequestDetails(idCourse);

  const tmpTitle = [
    {
      id: -1,
      label: 'Họ tên',
      value: 'Lưu Nhật',
      valueDisplay: 'Lưu Nhật',
      isCopyable: true,
    },
    {
      id: 0,
      label: 'Mail',
      value: 'nhatgv@gmail.com',
      valueDisplay: 'nhatgv@gmail.com',
      isCopyable: true,
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
            {/* <Typography sx={SX_PROFILE_TITLE}>{row.fullName}</Typography>
            <Typography sx={SX_PROFILE_TITLE_SUB}>Giáo viên</Typography> */}
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
          <Grid item xs={12}>
            <MuiButton
              color="miSmartOrange"
              fullWidth
              size="large"
              type="submit"
              variant="outlined"
              sx={{ fontFamily: FontFamily.bold }}
            >
              Xem chi tiết
            </MuiButton>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
