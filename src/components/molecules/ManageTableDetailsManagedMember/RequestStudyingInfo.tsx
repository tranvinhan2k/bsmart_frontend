import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useGetManagedMemberDetails } from '~/hooks/user/useGetManagedMemberDetails';
import { formatMoney } from '~/utils/money';
import {
  SX_BOX_ITEM_WRAPPER,
  SX_FORM_ITEM_LABEL2,
  SX_FORM_ITEM_VALUE2,
  SX_FORM_LABEL,
} from './style';

interface RequestStudyingInfoProps {
  idMentor: number;
}

export default function RequestStudyingInfo({
  idMentor,
}: RequestStudyingInfoProps) {
  const enum Text {
    mainTitle = 'Thống kê',
    labelNumberOfCourses = 'Khóa học tham gia',
    labelNumberOfClass = 'Lớp học tham gia',
  }
  const { managedMemberDetails, isLoading } =
    useGetManagedMemberDetails(idMentor);

  const title0 = managedMemberDetails
    ? [
        {
          id: 1,
          label: Text.labelNumberOfCourses,
          value: managedMemberDetails?.teachInformation?.numberOfCourse ?? 0,
        },
        {
          id: 2,
          label: Text.labelNumberOfClass,
          value: managedMemberDetails?.teachInformation?.numberOfClass ?? 0,
        },
      ]
    : [];

  return (
    <Box sx={SX_BOX_ITEM_WRAPPER}>
      <Typography sx={SX_FORM_LABEL}>{Text.mainTitle}</Typography>
      <Grid container mt={2} rowSpacing={2}>
        {title0.map((item) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={item.id}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography sx={SX_FORM_ITEM_LABEL2}>{item.label}</Typography>
              {isLoading ? (
                <Skeleton />
              ) : (
                <Typography sx={SX_FORM_ITEM_VALUE2} noWrap>
                  {item.value}
                </Typography>
              )}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
