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
import { Color, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CustomModal from '~/components/atoms/CustomModal';
import TextLine from '~/components/atoms/TextLine';
import CRUDTable from '~/components/molecules/CRUDTable';
import { image } from '~/constants/image';
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
  const [isShowImage, setShowImage] = useState(true);
  const [row, setRow] = useState<MentorClassMemberDetailPayload | undefined>();
  const [open, setOpen] = useState(false);
  const [search, setSearchValue] = useState('');
  const handleOpenDetailModal = () => {
    setOpen(!open);
  };
  const rows: MentorClassMemberDetailPayload[] = [
    {
      id: 0,
      name: 'Trần Vĩ Nhân',
      avatar: image.studentAvatar,
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
              transition: 'all 500ms ease',
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
      <Typography sx={globalStyles.textTitle}>Danh sách học viên</Typography>
      <Divider />
      <Stack marginTop={1}>
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
      </Stack>
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
      <CustomModal open={open} onClose={handleOpenDetailModal}>
        <Stack sx={{ width: '30vw', padding: 1 }}>
          <Box
            sx={{
              paddingX: 3,
              alignSelf: 'center',
              width: '200px',
              height: undefined,
              aspectRatio: 3 / 4,
              objectFit: 'cover',
              borderRadius: MetricSize.small_10,
            }}
            component="img"
            alt="hinh hoc sinh"
            src={row?.avatar || image.noAvatar}
          />
          <Stack paddingY={2}>
            <Typography>Thông tin học viên</Typography>
            <TextLine label="Mã học sinh" variable={`${row?.id}`} />
            <TextLine label="Tên học sinh" variable={row?.name || ''} />
            <TextLine label="Ngày sinh" variable={row?.dayOfBirth || ''} />
            <TextLine label="Email" variable={row?.email || ''} />
          </Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 1,
            }}
          >
            <Button variant="contained">Xem kết quả học tập</Button>
            <Button
              sx={{
                marginLeft: 1,
              }}
              variant="contained"
            >
              Xem điểm danh
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </Stack>
  );
}
