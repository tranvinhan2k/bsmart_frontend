import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useGetCourseCreateRequestDetails } from '~/hooks/course/useGetCourseCreateRequestDetails';
import columns from '~/constants/columns';
import CustomDialog from '~/components/atoms/CustomDialog';
import DataGrid, { MenuItemPayload } from '~/components/atoms/DataGrid';
import RequestCourseClassDetails from './RequestCourseClassDetails';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface RequestCourseTimetableProps {
  idCourse: number;
}

export default function RequestCourseClassList({
  idCourse,
}: RequestCourseTimetableProps) {
  const { courseCreateRequestDetails, isLoading, error } =
    useGetCourseCreateRequestDetails(idCourse);
  // const courseCreateRequestDetails = undefined;
  // const isLoading = undefined;
  // const error = undefined;

  const rows = courseCreateRequestDetails
    ? courseCreateRequestDetails?.classes
    : [];

  const [mode, setMode] = useState<'READ' | ''>('');
  const [open, setOpen] = useState<boolean>(false);
  const handleTriggerDialog = () => setOpen(!open);

  const handleViewDetails = () => {
    setMode('READ');
    handleTriggerDialog();
  };

  const popoverOptions: MenuItemPayload[] = [
    {
      icon: 'category',
      title: 'Xem chi tiết',
      onCLick: handleViewDetails,
    },
  ];

  let renderItem;
  switch (mode) {
    case 'READ':
      renderItem = (
        <CustomDialog open={open} onClose={handleTriggerDialog} maxWidth="md">
          <RequestCourseClassDetails onClose={handleTriggerDialog} />
        </CustomDialog>
      );
      break;
    default:
      renderItem = null;
      break;
  }

  return (
    <Box sx={SX_BOX_ITEM_WRAPPER}>
      <Typography sx={SX_FORM_LABEL}>Danh sách lớp</Typography>
      <Box mt={2} />
      <DataGrid
        rows={rows}
        columns={columns.courseClassListColumns}
        //
        disableSelectionOnClick
        hideFooterPagination
        density="compact"
        error={error}
        loading={isLoading}
        popoverOptions={popoverOptions}
        rowsPerPageOptions={[]}
      />
      {renderItem}
    </Box>
  );
}
