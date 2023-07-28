import {
  Avatar,
  Box,
  Button as MuiButton,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { FontFamily } from '~/assets/variables';
import { handleCopyToClipboard } from '~/utils/commonComp';
import { useGetCourseCreateRequestDetails } from '~/hooks/course/useGetCourseCreateRequestDetails';
import Icon from '~/components/atoms/Icon';
import {
  SX_FORM_ITEM_LABEL,
  SX_FORM_ITEM_VALUE,
  SX_PROFILE_TITLE,
  SX_WRAPPER,
} from '../style';
import { SX_BOX_ITEM_BG } from './style';

interface RequestCourseMentorInfoProps {
  idCourse: number;
}
export default function RequestCourseMentorInfo({
  idCourse,
}: RequestCourseMentorInfoProps) {
  const { courseCreateRequestDetails, isLoading } =
    useGetCourseCreateRequestDetails(idCourse);

  const tmpTitle = courseCreateRequestDetails
    ? [
        {
          id: 0,
          label: 'Họ tên',
          value: courseCreateRequestDetails.mentor.email,
          valueDisplay: courseCreateRequestDetails.mentor.email,
          isCopyable: true,
        },
        {
          id: 1,
          label: 'Mail',
          value: courseCreateRequestDetails.mentor.name,
          valueDisplay: courseCreateRequestDetails.mentor.name,
          isCopyable: true,
        },
      ]
    : [
        {
          id: 0,
          label: 'Họ tên',
          value: '',
          valueDisplay: '',
          isCopyable: true,
        },
        {
          id: 1,
          label: 'Mail',
          value: '',
          valueDisplay: '',
          isCopyable: true,
        },
      ];

  return (
    <Stack sx={SX_WRAPPER}>
      <Box p={2}>
        <Stack sx={SX_BOX_ITEM_BG}>
          <Box mt={{ xs: 10, sm: 23, md: 10 }}>
            <Avatar
              src={courseCreateRequestDetails?.mentor.avatar.url}
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
                {isLoading ? (
                  <Skeleton />
                ) : (
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
                )}
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
              Chi tiết giảng viên
            </MuiButton>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
