import {
  Box,
  Stack,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Switch,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Color, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CustomModal from '~/components/atoms/CustomModal';
import TextLine from '~/components/atoms/TextLine';
import TextTitle from '~/components/atoms/texts/TextTitle';
import CRUDTable from '~/components/molecules/CRUDTable';
import { image } from '~/constants/image';
import {
  MentorClassActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { useGetIdFromUrl } from '~/hooks';
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
  const [search, setSearchValue] = useState('');
  const handleOpenDetailModal = () => {
    if (row) {
      navigate(
        `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_class_detail}/${id}/${MentorClassActionLink.student_detail}/${row.id}`
      );
    }
  };
  const rows: MentorClassMemberDetailPayload[] = [
    {
      id: 0,
      name: 'Trần Vĩ Nhân',
      avatar: image.mockStudent,
      dayOfBirth: new Date().toString(),
      email: 'tranvinhan2k@gmail.com',
      phone: '0362017512',
    },
  ];

  const filterRows = rows.filter((item) =>
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
              src={params.row.avatar}
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
          searchPlaceholder="Nhập tên học sinh cần tìm"
          onSearch={({ searchValue }: { searchValue: string }) =>
            setSearchValue(searchValue)
          }
          rowHeight={isShowImage ? 200 : 60}
          setSelectedRow={setRow}
          columns={columns}
          rows={filterRows}
          menuItemList={[
            {
              title: 'Xem chi tiết',
              icon: 'search',
              onCLick: handleOpenDetailModal,
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}
