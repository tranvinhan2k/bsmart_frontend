import { useState } from 'react';
import CustomDialog from '~/components/atoms/CustomDialog';
import ManageTable, {
  MenuItemPayload,
} from '~/components/molecules/ManageTable';
import { CourseStatusType } from '~/constants/course';
import { rowsPerPageOptionsDefault } from '~/constants/dataGrid';
import { useSearchCourseCreateRequest } from '~/hooks/course/useSearchCourseCreateRequest';
import columns from '~/constants/columns';
import ManageTableCourseBlock from './ManageTableCourseBlock';
import ManageTableDetailsCourse from '../ManageTableDetailsCourse';

interface ManageTableCourseCreateRequestProps {
  status: CourseStatusType;
  refetchGetNoOfRequest: () => void;
}

export default function ManageTableCourse({
  status,
  refetchGetNoOfRequest,
}: ManageTableCourseCreateRequestProps) {
  const enum Text {
    searchPlaceholder = 'Tìm kiếm khóa học...',
    popoverOptionNotSupport = 'Chưa hỗ trợ',
    popoverOptionViewDetails = 'Xem chi tiết',
    popoverOptionToggleBlock = 'Chặn khóa học',
  }
  const enum ModeType {
    viewDetails = 'viewDetails',
    block = 'block',
  }

  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<ModeType | ''>('');
  const [selectedRow, setSelectedRow] = useState<any>();

  const [q, setQ] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(rowsPerPageOptionsDefault[0]);
  const [sort, setSort] = useState<string[]>([]);
  const handleNewPage = (params: number) => setPage(params);
  const handleNewSize = (params: number) => setSize(params);
  const handleTriggerDialog = () => setOpen(!open);

  const { error, courseCreateRequestList, isLoading, refetch } =
    useSearchCourseCreateRequest({ status, q, page, size, sort });
  const rows = courseCreateRequestList ? courseCreateRequestList.items : [];

  const handleSearch = (data: any) => {
    setQ(data.searchValue);
    refetch();
  };

  const handleOpenDetailsCourse = () => {
    handleTriggerDialog();
    setMode(() => ModeType.viewDetails);
  };
  const handleOpenBlockCourse = () => {
    handleTriggerDialog();
    setMode(() => ModeType.block);
  };

  const optionsDefault: MenuItemPayload[] = [
    {
      icon: 'question',
      title: Text.popoverOptionNotSupport,
      onCLick: () => console.log(Text.popoverOptionNotSupport),
    },
  ];
  const optionsNotStart: MenuItemPayload[] = [
    {
      icon: 'category',
      title: Text.popoverOptionViewDetails,
      onCLick: handleOpenDetailsCourse,
    },
  ];
  const optionsStarting: MenuItemPayload[] = [
    {
      icon: 'category',
      title: Text.popoverOptionViewDetails,
      onCLick: handleOpenDetailsCourse,
    },
    {
      icon: 'blockIcon',
      title: Text.popoverOptionToggleBlock,
      onCLick: handleOpenBlockCourse,
    },
  ];
  let popoverOptions;
  switch (status) {
    case CourseStatusType.NOTSTART:
      popoverOptions = optionsNotStart;
      break;
    case CourseStatusType.STARTING:
      popoverOptions = optionsStarting;
      break;
    default:
      popoverOptions = optionsDefault;
      break;
  }

  let renderItem;
  switch (mode) {
    case ModeType.viewDetails:
      renderItem = (
        <CustomDialog
          open={open}
          onClose={handleTriggerDialog}
          maxWidth={false}
        >
          <ManageTableDetailsCourse
            row={selectedRow}
            onClose={handleTriggerDialog}
            refetchSearch={refetch}
            refetchGetNoOfRequest={refetchGetNoOfRequest}
          />
        </CustomDialog>
      );
      break;
    case ModeType.block:
      renderItem = (
        <CustomDialog open={open} onClose={handleTriggerDialog}>
          <ManageTableCourseBlock
            row={selectedRow}
            onClose={handleTriggerDialog}
            refetchSearch={refetch}
            refetchGetNoOfRequest={refetchGetNoOfRequest}
          />
        </CustomDialog>
      );
      break;
    default:
      renderItem = null;
      break;
  }

  return (
    <>
      <ManageTable
        columns={columns.managedCourseColumns}
        rows={rows}
        error={error}
        isLoading={isLoading}
        onPageChange={handleNewPage}
        onPageSizeChange={handleNewSize}
        page={page}
        pageSize={size}
        popoverOptions={popoverOptions}
        rowsPerPageOptions={rowsPerPageOptionsDefault}
        setSelectedRow={setSelectedRow}
        totalItems={courseCreateRequestList?.totalItems ?? 0}
        searchHandler={{
          searchPlaceholder: Text.searchPlaceholder,
          onSearch: handleSearch,
        }}
        hideFooterSelectedRowCount
      />
      {renderItem}
    </>
  );
}
