import { Grid, Stack, Typography } from '@mui/material';
import { useGetManagedClassDetails } from '~/hooks/class/useGetManagedClassDetails';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface ClassDetailsStudentListProps {
  idClass: number;
  scrollRef: any;
}

export default function ClassDetailsStudentList({
  idClass,
  scrollRef,
}: ClassDetailsStudentListProps) {
  const { classDetails, isLoading } = useGetManagedClassDetails(idClass);

  const numberOfCurrentStudent = classDetails
    ? classDetails.numberOfCurrentStudent
    : 0;

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER} ref={scrollRef}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>
            Danh sách học sinh ({numberOfCurrentStudent})
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
