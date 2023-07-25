import { useState } from 'react';
import CustomDialog from '~/components/atoms/CustomDialog';
import ManageTable, {
  MenuItemPayload,
} from '~/components/molecules/ManageTable';
import columns from '~/constants/columns';
import CourseCreateRequestDetails from '~/containers/CreateCourseRequestManageSection/CourseCreateRequestDetails';
import { useSearchCourseCreateRequest } from '~/hooks/course/useSearchCourseCreateRequest';

interface ManageTableCourseCreateRequestProps {
  status:
    | 'WAITING'
    | 'REQUESTING'
    | 'NOTSTART'
    | 'STARTING'
    | 'EDITREQUEST'
    | 'REJECTED';
}

export default function ManageTableCourseCreateRequest({
  status,
}: ManageTableCourseCreateRequestProps) {
  const enum Text {
    searchPlaceholder = 'Tìm kiếm khóa học...',
    searchButtonLabel = 'Tìm kiếm',
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

  const { error, courseCreateRequestList, isLoading, refetch } =
    useSearchCourseCreateRequest({ status, q, page, size, sort });

  // const filterRows =
  //   courseCreateRequestList?.filter((item: any) => {
  //     if (searchValue) {
  //       return item?.name?.toLowerCase().includes(searchValue.toLowerCase());
  //     }
  //     return item;
  //   }) || [];

  // console.log('courseCreateRequestList', courseCreateRequestList.items);

  const rows = courseCreateRequestList ? courseCreateRequestList.items : [];
  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);
  const handleTriggerDialog = () => setOpen(!open);

  const handleSearchCourseCreateRequest = (data: any) => {
    setSearchValue(data.searchValue);
  };
  const handleOpenDetailCourseCreateRequest = () => {
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
      onCLick: handleOpenDetailCourseCreateRequest,
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
          <CourseCreateRequestDetails
            row={selectedRow}
            onClose={handleTriggerDialog}
            refetch={refetch}
          />
        </CustomDialog>
      );
      break;
    default:
      break;
  }

  return (
    <>
      <ManageTable
        columns={columns.courseCreateRequestColumns}
        rows={rows}
        page={page}
        pageSize={size}
        totalItems={courseCreateRequestList?.totalItems ?? 0}
        onPageChange={handleNewPage}
        onPageSizeChange={handleNewSize}
        handleNewPage={handleNewPage}
        handleNewSize={handleNewSize}
        //
        error={error}
        isLoading={isLoading}
        // menuItemList={menuItemList}
        onSearch={handleSearchCourseCreateRequest}
        popoverOptions={popoverOptions}
        setSelectedRow={setSelectedRow}
        searchHandler={{
          searchPlaceholder: Text.searchPlaceholder,
          searchButtonLabel: Text.searchPlaceholder,
        }}
      />
      {renderItem}
    </>
  );
}
