import { Stack } from '@mui/material';
import { ClassStatusList } from '~/constants';
import { formatDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import { TimetablePayload } from '../Timetable';
import { ClassStatusKeys } from '~/models/variables';
import TextList, { TextListPayload } from '~/components/atoms/texts/TextList';

interface Props {
  code: string;
  name: string;
  timetable: TimetablePayload[];
  imageUrl: string;
  imageAlt: string;
  startDate: string;
  endDate: string;
  subjectName: string;
  numberOfSlot: number;
  numberOfStudent: number;
  price: number;
  status: ClassStatusKeys;
}

export default function ClassInformationList({
  code,
  endDate,
  imageAlt,
  imageUrl,
  name,
  numberOfSlot,
  numberOfStudent,
  price,
  startDate,
  status,
  subjectName,
  timetable,
}: Props) {
  const displayLineData: TextListPayload[] = [
    {
      id: 0,
      name: 'Mã khóa học',
      value: code,
      type: 'text',
    },
    {
      id: 0,
      name: 'Tên lớp học',
      value: name,
      type: 'text',
    },
    {
      id: 0,
      name: 'Thời khóa biểu mặc định hàng tuần từ thứ 2 đến thứ 7',
      timetable,
      type: 'timetable',
    },
    {
      id: 0,
      name: 'Hình ảnh',
      value: imageUrl,
      alt: imageAlt,
      type: 'image',
    },
    {
      id: 0,
      name: 'Ngày bắt đầu',
      value: formatDate(startDate),
      type: 'text',
    },
    {
      id: 0,
      name: 'Ngày kết thúc',
      value: formatDate(endDate),
      type: 'text',
    },
    {
      id: 0,
      name: 'Môn học',
      value: subjectName,
      type: 'text',
    },
    {
      id: 0,
      name: 'Sớ buổi học',
      value: `${numberOfSlot}`,
      type: 'text',
    },
    {
      id: 0,
      name: 'Số học sinh',
      value: `${numberOfStudent}`,
      type: 'text',
    },
    {
      id: 0,
      name: 'Giá lớp học',
      value: formatMoney(price),
      type: 'text',
    },
    {
      id: 0,
      name: 'Trạng thái',
      value: `${ClassStatusList.find((item) => item.value === status)?.label}`,
      type: 'text',
    },
  ];

  return (
    <Stack>
      <TextList items={displayLineData} />
    </Stack>
  );
}
