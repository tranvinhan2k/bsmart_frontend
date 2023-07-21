import { Stack, Typography, Divider, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import ReturnLink from '~/components/atoms/ReturnLink';
import { image } from '~/constants/image';
import globalStyles from '~/styles';

export interface MentorClassDetailPayload {
  id: number;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  attendanceInformation: {
    timeSlotOff: number;
    timeSlotLeft: number;
  };
  points: {
    id: number;
    name: string;
    value: number;
  }[];
}

export default function MentorClassStudentDetailPage() {
  const student: MentorClassDetailPayload = {
    name: 'Trần Vĩ Nhân',
    phone: '0362017512',
    email: 'tranvinhan2k@gmail.com',
    attendanceInformation: {
      timeSlotLeft: 5,
      timeSlotOff: 3,
    },
    id: 0,
    imageUrl: image.mockStudent,
    points: [
      {
        id: 0,
        name: 'Kiểm tra 15 phút',
        value: 9.5,
      },
      {
        id: 0,
        name: 'Kiểm tra 1 tiết',
        value: 9.5,
      },
    ],
  };

  return (
    <Stack>
      <ReturnLink />
      <Typography sx={globalStyles.textSubTitle}>Chi tiết học sinh</Typography>
      <Divider />
      <Stack marginTop={2}>
        <Typography sx={globalStyles.textSmallLabel}>
          Thông tin học sinh
        </Typography>

        <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <Stack>
            <Box
              component="img"
              sx={{
                width: '100px',
                aspectRatio: 3 / 4,
                borderRadius: MetricSize.small_5,
              }}
              src={student.imageUrl}
              alt="anh hoc sinh"
            />
          </Stack>
          <Stack
            sx={{
              marginLeft: 1,
            }}
          >
            {[
              { label: 'Tên học sinh', value: student.name },
              { label: 'Email', value: student.email },
              { label: 'Số điện thoại', value: student.phone },
            ].map((item, index) => (
              <Stack marginTop={1} key={index}>
                <Typography
                  sx={{
                    fontFamily: FontFamily.bold,
                    fontSize: FontSize.small_14,
                    color: Color.black,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: FontFamily.regular,
                    fontSize: FontSize.small_16,
                    color: Color.black,
                  }}
                >
                  {item.value}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Typography sx={globalStyles.textSmallLabel}>
          Thông tin điểm số
        </Typography>

        <Typography sx={globalStyles.textSmallLabel}>
          Thông tin điểm danh
        </Typography>
      </Stack>
    </Stack>
  );
}
