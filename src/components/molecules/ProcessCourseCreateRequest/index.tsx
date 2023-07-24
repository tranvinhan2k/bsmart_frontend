import { useState } from 'react';
import { useSearchCourseCreateRequest } from '~/hooks/course/useSearchCourseCreateRequest';
import columns from '~/constants/columns';
import CRUDTable, { MenuItemPayload } from '~/components/molecules/CRUDTable';
import CustomDialog from '~/components/atoms/CustomDialog';
import CourseCreateRequestDetails from '~/containers/CreateCourseRequestManageSection/CourseCreateRequestDetails';
import toast from '~/utils/toast';
import { ProcessCreateCourseRequestFormDefault } from '~/models/form';
import { ProcessCreateCourseRequestPayload } from '~/api/courses';

interface ProcessCourseCreateRequestProps {
  status:
    | 'WAITING'
    | 'REQUESTING'
    | 'NOTSTART'
    | 'STARTING'
    | 'EDITREQUEST'
    | 'REJECTED';
}

export default function ProcessCourseCreateRequest({
  status,
}: ProcessCourseCreateRequestProps) {
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

  const handleTriggerDialog = () => setOpen(!open);

  const handleSearchCourseCreateRequest = (data: any) => {
    setSearchValue(data.searchValue);
  };
  const handleOpenDetailCourseCreateRequest = () => {
    handleTriggerDialog();
    setMode(() => 'READ');
  };

  const menuItemListDefault: MenuItemPayload[] = [
    {
      icon: 'question',
      title: 'Chưa hỗ trợ',
      onCLick: () => console.log('Chưa hỗ trợ'),
    },
  ];
  const menuItemListRead: MenuItemPayload[] = [
    {
      icon: 'category',
      title: 'Xem chi tiết',
      onCLick: handleOpenDetailCourseCreateRequest,
    },
  ];
  let menuItemList = null;
  switch (status) {
    case 'WAITING':
      menuItemList = menuItemListRead;
      break;
    default:
      menuItemList = menuItemListDefault;
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
          />
        </CustomDialog>
      );
      break;
    default:
      break;
  }

  return (
    <>
      <CRUDTable
        setSelectedRow={setSelectedRow}
        isLoading={isLoading}
        error={error}
        addItemButtonLabel="Thêm môn học"
        columns={columns.courseCreateRequestColumns}
        // onAdd={}
        searchPlaceholder="Tìm kiếm khóa học..."
        onSearch={handleSearchCourseCreateRequest}
        rows={rows}
        menuItemList={menuItemList}
      />
      {renderItem}
    </>
  );
}
