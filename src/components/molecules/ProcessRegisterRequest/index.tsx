import { useState } from 'react';
import { ProcessRegisterRequestFormDefault } from '~/models/form';
import { ProcessRegisterRequestPayload } from '~/api/mentorProfile';
import { useManageRegisterRequest } from '~/hooks/useManageRegisterRequest';
import columns from '~/constants/columns';
import ReadOneRegisterRequest from '~/containers/RegisterRequestManageSection/ReadOneRegisterRequest';
import toast from '~/utils/toast';
import CustomDialog from '~/components/atoms/CustomDialog';
import { useSearchRegisterRequest } from '~/hooks/user/useSearchRegisterRequest';
import ManageTableCourseCreateRequest from '../ManageTableCourseCreateRequest';
import ManageTable, {
  MenuItemPayload,
} from '~/components/molecules/ManageTable';

interface ProcessRegisterRequestProps {
  status:
    | 'WAITING'
    | 'REQUESTING'
    | 'NOTSTART'
    | 'STARTING'
    | 'EDITREQUEST'
    | 'REJECTED';
}

export default function ProcessRegisterRequest({
  status,
}: ProcessRegisterRequestProps) {
  const enum Text {
    searchPlaceholder = 'Tìm kiếm yêu cầu...',
    popoverOptionViewDetails = 'Xem chi tiết',
    popoverOptionNotSupport = 'Chưa hỗ trợ',
  }

  const [searchValue, setSearchValue] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'READ' | 'VERIFY' | ''>('');
  const [selectedRow, setSelectedRow] = useState<any>();

  // const [status, setStatus] = useState<string>('STARTING');
  const [q, setQ] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [sort, setSort] = useState<string[]>([]);

  const { error, registerRequest, isLoading, refetch } =
    useSearchRegisterRequest({ status, q, page, size, sort });

  const rows = registerRequest ? registerRequest.items : [];
  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);
  const handleTriggerDialog = () => setOpen(!open);

  const handleSearch = (data: any) => {
    setQ(data.searchValue);
    refetch();
  };

  const handleOpenRegisterRequestDetails = () => {
    handleTriggerDialog();
    setMode(() => 'READ');
  };

  const popoverOptionsDefault: MenuItemPayload[] = [
    {
      icon: 'question',
      title: Text.popoverOptionNotSupport,
      onCLick: () => console.log(Text.popoverOptionNotSupport),
    },
  ];

  const optionsViewDetails: MenuItemPayload[] = [
    {
      icon: 'category',
      title: Text.popoverOptionViewDetails,
      onCLick: handleOpenRegisterRequestDetails,
    },
  ];

  let popoverOptions = null;
  switch (status) {
    case 'WAITING':
      popoverOptions = optionsViewDetails;
      break;
    default:
      popoverOptions = popoverOptionsDefault;
      break;
  }

  let renderItem = null;
  switch (mode) {
    case 'READ':
      renderItem = (
        <CustomDialog
          open={open}
          onClose={handleTriggerDialog}
          maxWidth={false}
        >
          <h1>Hello</h1>
          {/* <ReadOneRegisterRequest
            row={selectedRow}
            onClose={handleTriggerDialog}
            refetch={refetch}
          /> */}
        </CustomDialog>
      );
      break;
    default:
      break;
  }

  return (
    <>
      <ManageTable
        columns={columns.registerRequestColumns}
        rows={rows}
        error={error}
        isLoading={isLoading}
        onPageChange={handleNewPage}
        onPageSizeChange={handleNewSize}
        page={page}
        pageSize={size}
        popoverOptions={popoverOptions}
        setSelectedRow={setSelectedRow}
        totalItems={registerRequest?.totalItems ?? 0}
        searchHandler={{
          searchPlaceholder: Text.searchPlaceholder,
          onSearch: handleSearch,
        }}
      />
      {renderItem}
    </>
  );
}
