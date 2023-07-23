import { Stack, Typography, Divider, Box } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import TextTitle from '~/components/atoms/texts/TextTitle';
import ClassInformationList from '~/components/molecules/ClassInformationList';
import Timetable from '~/components/molecules/Timetable';
import { ClassStatusList } from '~/constants';
import { image } from '~/constants/image';
import { useDispatchGetAllDayOfWeeks, useDispatchGetAllSlots } from '~/hooks';
import { OptionPayload } from '~/models';
import { ClassStatusKeys } from '~/models/variables';
import globalStyles from '~/styles';
import { formatDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';

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
