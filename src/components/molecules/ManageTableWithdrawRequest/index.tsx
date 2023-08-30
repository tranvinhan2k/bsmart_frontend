import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { utils, writeFile } from 'xlsx';
import { rowsPerPageOptionsDefault } from '~/constants/dataGrid';
import { useSearchManagedWithdrawRequest } from '~/hooks/transaction/useSearchTransaction';
import { WithdrawRequestStatusType } from '~/constants/transaction';
import columns from '~/constants/columns';
import CustomDialog from '~/components/atoms/CustomDialog';
import Icon from '~/components/atoms/Icon';
import ManagedWithdrawRequestGuide from './ManagedWithdrawRequestGuide';
import ManageTable from '~/components/molecules/ManageTable';
import ManageTableProcessWithdrawRequest from '../ManageTableProcessWithdrawRequest';

interface Props {
  status: WithdrawRequestStatusType;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableWithdrawRequest({
  status,
  refetchGetNoOfRequest,
}: Props) {
  const enum Text {
    searchPlaceholder = 'Tìm kiếm yêu cầu...',
    popoverOptionViewDetails = 'Lấy danh sách',
    popoverOptionNotSupport = 'Chưa hỗ trợ',
  }

  const [q, setQ] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(rowsPerPageOptionsDefault[0]);
  const [sort, setSort] = useState<string[]>(['created,desc']);

  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);

  const [open, setOpen] = useState<boolean>(false);
  const handleTriggerDialog = () => setOpen(!open);

  const { managedWithdrawRequestList, error, isLoading, refetch } =
    useSearchManagedWithdrawRequest({ status, q, page, size, sort });
  const rows = managedWithdrawRequestList
    ? managedWithdrawRequestList.items
    : [];

  const handleSearch = (data: any) => {
    setQ(data.searchValue);
    refetch();
  };

  const exportExcel = () => {
    const ws = utils.json_to_sheet(rows);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    writeFile(wb, 'Danh sách yêu cầu rút tiền cần xử lý.xlsx');
  };

  return (
    <>
      {status === WithdrawRequestStatusType.WAITING && (
        <>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            mb={2}
          >
            <Button
              variant="contained"
              color="miSmartOrange"
              startIcon={
                <Icon name="fileDownloadIcon" size="small_20" color="white" />
              }
              onClick={exportExcel}
            >
              Xuất danh sách
            </Button>
            <Button
              variant="contained"
              color="miSmartOrange"
              startIcon={
                <Icon name="fileUploadIcon" size="small_20" color="white" />
              }
              onClick={handleTriggerDialog}
            >
              Nhập danh sách
            </Button>
          </Stack>
          <Box mt={4}>
            <ManagedWithdrawRequestGuide />
          </Box>
          <CustomDialog
            title="Xử lý yêu cầu rút tiền chưa giải quyết"
            open={open}
            onClose={handleTriggerDialog}
          >
            <ManageTableProcessWithdrawRequest
              onClose={handleTriggerDialog}
              refetchSearch={refetch}
              refetchGetNoOfRequest={refetchGetNoOfRequest}
            />
          </CustomDialog>
        </>
      )}
      <ManageTable
        columns={columns.managedWithdrawRequestColumns}
        rows={rows}
        error={error}
        isLoading={isLoading}
        onPageChange={handleNewPage}
        onPageSizeChange={handleNewSize}
        page={page}
        pageSize={size}
        // popoverOptions={popoverOptions}
        rowsPerPageOptions={rowsPerPageOptionsDefault}
        // setSelectedRow={setSelectedRow}
        totalItems={managedWithdrawRequestList?.totalItems ?? 0}
        searchHandler={{
          searchPlaceholder: Text.searchPlaceholder,
          onSearch: handleSearch,
        }}
        hideFooterSelectedRowCount
      />
    </>
  );
}
