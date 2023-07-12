import { Box, Stack, Typography, Divider } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { MetricSize } from '~/assets/variables';
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

export default function MentorStudentListPage() {
  const [row, setRow] = useState<MentorClassMemberDetailPayload | undefined>();
  const [open, setOpen] = useState(false);
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
          <Box
            alt="hinh anh hoc sinh"
            component="img"
            src={params.row.avatar}
            sx={{
              width: undefined,
              height: '100px',
              aspectRatio: 4 / 3,
              objectFit: 'cover',
            }}
          />
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
        <CRUDTable
          setSelectedRow={setRow}
          columns={columns}
          rows={rows}
          menuItemList={[
            {
              title: 'Xem chi tiết',
              icon: 'search',
              onCLick: handleOpenDetailModal,
            },
          ]}
        />
      </Stack>
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
