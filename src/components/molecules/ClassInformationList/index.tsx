import { Box, Stack, Typography } from '@mui/material';
import { FontSize, FontFamily, Color } from '~/assets/variables';
import { ClassStatusList } from '~/constants';
import { OptionPayload } from '~/models';
import globalStyles from '~/styles';
import { formatDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import Timetable from '../Timetable';
import { ClassStatusKeys } from '~/models/variables';
import TextList, { TextListPayload } from '~/components/atoms/texts/TextList';

interface Props {
  code: string;
  name: string;
  timetable: {
    slot: OptionPayload;
    dayOfWeek: OptionPayload;
  }[];
  imageUrl: string;
  imageAlt: string;
  startDate: string;
  endDate: string;
  categoryName: string;
  subjectName: string;
  numberOfSlot: number;
  numberOfStudent: number;
  price: number;
  status: ClassStatusKeys;
}

export default function ClassInformationList({
  categoryName,
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
    },
    {
      id: 0,
      name: 'Tên lớp học',
      value: name,
    },
    {
      id: 0,
      name: 'Thời khóa biểu',
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
    },
    {
      id: 0,
      name: 'Ngày kết thúc',
      value: formatDate(endDate),
    },
    {
      id: 0,
      name: 'Lĩnh vực',
      value: categoryName,
    },
    {
      id: 0,
      name: 'Môn học',
      value: subjectName,
    },
    {
      id: 0,
      name: 'Sớ buổi học',
      value: `${numberOfSlot}`,
    },
    {
      id: 0,
      name: 'Số học sinh',
      value: `${numberOfStudent}`,
    },
    {
      id: 0,
      name: 'Giá lớp học',
      value: formatMoney(price),
    },
    {
      id: 0,
      name: 'Trạng thái',
      value: `${ClassStatusList.find((item) => item.value === status)?.label}`,
    },
  ];

  return (
    <Stack>
      <TextList items={displayLineData} />
    </Stack>
  );
}
