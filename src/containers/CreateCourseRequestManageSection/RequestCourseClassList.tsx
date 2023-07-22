import { Box, Stack, Typography } from '@mui/material';
import { GridSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { FontFamily } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import DataGrid, { MenuItemPayload } from '~/components/atoms/DataGrid';
import columns from '~/constants/columns';
import CustomDialog from '~/components/atoms/CustomDialog';
import Timetable from '~/components/molecules/Timetable';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';
import RequestCourseClassDetails from './RequestCourseClassDetails';

interface RequestCourseTimetableProps {
  row: any;
}

export default function RequestCourseClassList({
  row,
}: RequestCourseTimetableProps) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('');
  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);
  const isLoading = false;
  const error = undefined;

  const courseClassListRow = {
    // totalPages: 1,
    // totalItems: 3,
    // currentPage: 0,
    // first: true,
    // last: true,
    items: [
      {
        id: 1,
        code: 'At46vf2',
        name: 'Lớp số 1',
        schedule: {},
        price: 1000,
      },
      {
        id: 2,
        code: 'At46vf4',
        name: 'Lớp số 2',
        schedule: {},
        price: 1000,
      },
    ],
  };

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridSelectionModel>([]);

  const [open, setOpen] = useState<boolean>(false);
  const handleTriggerDialog = () => setOpen(!open);

  const handleViewDetails = () => {
    handleTriggerDialog();
  };

  const popoverOptions: MenuItemPayload[] = [
    {
      icon: 'category',
      title: 'Xem chi tiết',
      onCLick: handleViewDetails,
    },
  ];

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Typography sx={SX_FORM_LABEL}>Danh sách lớp</Typography>
      {/* {row.timeInWeek ? (
        <Timetable data={row.timeInWeek as any} />
      ) : (
        <Typography sx={{ fontFamily: FontFamily.light }}>
          <b style={{ color: 'red' }}>Không tồn tại</b>
        </Typography>
      )} */}
      <Box mt={2} />
      <DataGrid
        rows={courseClassListRow.items}
        columns={columns.courseClassListColumns}
        //
        checkboxSelection
        disableSelectionOnClick
        hideFooterPagination
        density="compact"
        error={error}
        loading={isLoading}
        popoverOptions={popoverOptions}
        rowsPerPageOptions={[]}
        selectionModel={rowSelectionModel}
        onSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
      />
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
        mt={2}
      >
        <Button
          color="miSmartOrange"
          fullWidth
          type="submit"
          variant="contained"
          sx={{ fontFamily: FontFamily.bold }}
          disabled={rowSelectionModel.length <= 0}
        >
          Phê duyệt các lớp đã chọn
        </Button>
      </Stack>
      <CustomDialog open={open} onClose={handleTriggerDialog} maxWidth="md">
        <RequestCourseClassDetails onClose={handleTriggerDialog} />
      </CustomDialog>
    </Stack>
  );
}
