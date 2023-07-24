import { Alert, Box, FormHelperText, Stack } from '@mui/material';
import Button from '~/components/atoms/Button';
import TextTitle from '~/components/atoms/texts/TextTitle';
import ClassInformationList from '~/components/molecules/ClassInformationList';
import { image } from '~/constants/image';
import { useDispatchGetAllDayOfWeeks, useDispatchGetAllSlots } from '~/hooks';
import { OptionPayload } from '~/models';
import { ClassStatusKeys } from '~/models/variables';
import globalStyles from '~/styles';

export interface MentorClassInformationPayload {
  id: number;
  code: string;
  name: string;
  numberOfSlot: number;
  numberOfStudent: number;
  startDate: string;
  endDate: string;
  status: ClassStatusKeys;
  subjectName: string;
  categoryName: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
  timetable: {
    slot: OptionPayload;
    dayOfWeek: OptionPayload;
  }[];
}

export default function MentorClassInformationPage() {
  const { optionSlots } = useDispatchGetAllSlots();
  const { optionDayOfWeeks } = useDispatchGetAllDayOfWeeks();
  const detailClass: MentorClassInformationPayload = {
    categoryName: 'Front End',
    code: '#dssa8',
    endDate: new Date().toString(),
    startDate: new Date().toString(),
    id: 0,
    imageAlt: 'lop cua giao vien',
    imageUrl: image.mockClass,
    name: 'Lớp học kiểm thử',
    numberOfSlot: 30,
    numberOfStudent: 45,
    price: 120000,
    status: 'STARTING',
    subjectName: 'Java',
    timetable: [
      {
        slot: optionSlots[0],
        dayOfWeek: optionDayOfWeeks[0],
      },
    ],
  };

  return (
    <Stack>
      <TextTitle title="Nội dung khóa học" />
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <Alert severity="warning">
          Lớp học chưa được phê duyệt. Vui lòng phê duyệt lớp để thao tác với
          lớp học.
        </Alert>
        <Alert severity="info">
          Lớp học đã kết thúc. Mọi thao tác sẽ bị hủy bỏ
        </Alert>
        <Alert severity="info">
          Lớp học đang chiêu sinh và sẽ mở vào ngày 12/10/2023 vào lúc 12:00
        </Alert>
        <Alert severity="warning">
          Lớp học đã tới thời gian bắt đầu. Tuy nhiên, số lượng học sinh chưa đủ
          để tự động mở lớp. Vui lòng tùy chọn thao tác với lớp học nếu không
          lớp học sẽ tự động hủy trong 48h tiếp theo.
        </Alert>
        <Box marginTop={1}>
          <Stack sx={globalStyles.viewFlexRowCenter}>
            <Button variant="contained" color="primary">
              danh sách học sinh đã đăng kí
            </Button>
            <Button
              sx={{
                marginLeft: 1,
              }}
              variant="contained"
              color="success"
            >
              Mở lớp
            </Button>
            <Button
              sx={{
                marginLeft: 1,
              }}
              variant="contained"
              color="error"
            >
              Hủy mở lớp học
            </Button>
          </Stack>
          <FormHelperText>
            {' '}
            Lưu ý: Lớp học hiện tại chưa đủ số lượng học sinh tối thiểu mặc dù
            đã đủ tới thời gian nhập học. Khi bấm vào nút trên lớp bạn sẽ được
            phép mở với số lượng học sinh hiện tại
          </FormHelperText>
        </Box>
      </Stack>
      <Stack marginTop={1} sx={globalStyles.viewRoundedWhiteBody}>
        <ClassInformationList
          categoryName={detailClass.categoryName}
          code={detailClass.code}
          endDate={detailClass.endDate}
          imageAlt={detailClass.imageAlt}
          imageUrl={detailClass.imageUrl}
          name={detailClass.name}
          numberOfSlot={detailClass.numberOfSlot}
          numberOfStudent={detailClass.numberOfStudent}
          price={detailClass.price}
          startDate={detailClass.startDate}
          status={detailClass.status}
          subjectName={detailClass.subjectName}
          timetable={detailClass.timetable}
        />
      </Stack>
    </Stack>
  );
}
