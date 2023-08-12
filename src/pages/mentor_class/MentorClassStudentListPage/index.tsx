import { Box, Stack, FormControlLabel, Switch } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MetricSize } from '~/assets/variables';
import CustomModal from '~/components/atoms/CustomModal';
import TextTitle from '~/components/atoms/texts/TextTitle';
import CRUDTable from '~/components/molecules/CRUDTable';
import UserDetailInformation from '~/components/molecules/UserDetailInformation';
import { image } from '~/constants/image';
import {
  MentorClassActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import {
  useGetIdFromUrl,
  useGetMentorMarkReport,
  useQueryStudentList,
} from '~/hooks';
import { useBoolean } from '~/hooks/useBoolean';
import globalStyles from '~/styles';

export interface MentorClassMemberDetailPayload {
  id: number;
  avatar: string;
  name: string;
  dayOfBirth: string;
  email: string;
  phone: string;
}

export default function MentorClassStudentListPage() {
  const id = useGetIdFromUrl('id');
  const navigate = useNavigate();
  const [isShowImage, setShowImage] = useState(true);
  const [row, setRow] = useState<MentorClassMemberDetailPayload | undefined>();
  const { value, toggle } = useBoolean(false);
  const [search, setSearchValue] = useState('');
  const handleOpenDetailModal = () => {
    if (row) {
      navigate(
        `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_class_detail}/${id}/${MentorClassActionLink.student_detail}/${row.id}`
      );
    }
  };

  const {
    currentPage,
    error,
    handleChangePageNumber,
    isLoading,
    studentList,
    totalPages,
    filterParams,
  } = useQueryStudentList(id);

  const rows = studentList;

  const { data: marks } = useGetMentorMarkReport(id);

  const filterRows = rows?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Mã học sinh',
      flex: 1,
    },
    {
      field: 'avatar',
      headerName: 'Hình ảnh lớp học',
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: 1,
              height: isShowImage ? '100%' : 0,
              opacity: isShowImage ? 1 : 0,
              transition: 'height 500ms ease',
            }}
          >
            <Box
              alt="hinh anh hoc sinh"
              component="img"
              src={params.row.avatar || image.noCourse}
              sx={{
                width: '100%',
                height: undefined,
                aspectRatio: 3 / 4,
                borderRadius: MetricSize.small_5,
                objectFit: 'cover',
              }}
            />
          </Stack>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Tên học sinh',
      flex: 5,
    },
  ];

  return (
    <Stack>
      <TextTitle title="Danh sách học sinh" />
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <FormControlLabel
          control={
            <Switch
              color="secondary"
              defaultChecked
              checked={isShowImage}
              onChange={() => setShowImage(!isShowImage)}
            />
          }
          label="Hiển thị hình ảnh"
        />

        <CRUDTable
          page={currentPage}
          pagination
          pageSize={filterParams.size || 0}
          onPageChange={handleChangePageNumber}
          paginationMode="server"
          rowCount={totalPages}
          isLoading={isLoading}
          error={error}
          searchPlaceholder="Nhập tên học sinh cần tìm"
          onSearch={({ searchValue }: { searchValue: string }) =>
            setSearchValue(searchValue)
          }
          rowHeight={isShowImage ? 200 : 60}
          setSelectedRow={setRow}
          columns={columns}
          rows={filterRows || []}
          menuItemList={[
            {
              title: 'Xem chi tiết',
              icon: 'search',
              onCLick: toggle,
            },
          ]}
        />

        <CustomModal open={value} onClose={toggle} title="Thông tin học sinh">
          <Stack minWidth="50vw">
            <UserDetailInformation
              email={row?.email || ''}
              imageAlt={row?.avatar || ''}
              imageUrl={row?.avatar || ''}
              name={row?.name || ''}
              phone={row?.phone || ''}
              mark={marks?.find((item) => item.code === row?.id)}
            />
          </Stack>
        </CustomModal>
      </Stack>
    </Stack>
  );
}
