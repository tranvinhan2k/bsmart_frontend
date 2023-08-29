import { Box, CircularProgress, Typography } from '@mui/material';
import ManageTableNoPagination from '~/components/molecules/ManageTableNoPagination';
import columns from '~/constants/columns';
import { useGetManagedClassDetails } from '~/hooks/class/useGetManagedClassDetails';
// import ManageTableNoPagination from '../ManageTableNoPagination';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_ITEM_LABEL } from './style';

interface RequestCourseClassStudentListProps {
  idClass: number;
}
export default function RequestCourseClassStudentList({
  idClass,
}: RequestCourseClassStudentListProps) {
  const { classDetails, isLoading } = useGetManagedClassDetails(idClass);
  const rows = classDetails?.studentClass ?? [];
  const rowsWithSerialNumber = rows.map((row, index) => {
    return { ...row, serialNumber: index + 1 };
  });

  return (
    <Box sx={SX_BOX_ITEM_WRAPPER}>
      <Typography sx={SX_FORM_ITEM_LABEL}>
        Danh sách học sinh ({rows.length})
      </Typography>
      <Box mt={2}>
        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <ManageTableNoPagination
            columns={columns.managedClassStudentListColumns}
            rows={rowsWithSerialNumber}
            hideFooter
          />
        )}
      </Box>
    </Box>
  );
}
