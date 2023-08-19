import { Grid, Stack, Typography } from '@mui/material';
import { useGetManagedClassDetails } from '~/hooks/class/useGetManagedClassDetails';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface ClassDetailsStudentListProps {
  idClass: number;
}

export default function ClassDetailsStudentList({
  idClass,
}: ClassDetailsStudentListProps) {
  const { classDetails, isLoading } = useGetManagedClassDetails(idClass);

  const numberOfCurrentStudent = classDetails
    ? classDetails.numberOfCurrentStudent
    : 0;

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>
            Thông tin danh sách học sinh ({numberOfCurrentStudent})
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
