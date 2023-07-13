import { Stack, Typography, Divider, Box } from '@mui/material';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Timetable from '~/components/molecules/Timetable';
import { ClassStatusList } from '~/constants';
import { image } from '~/constants/image';
import { useDispatchGetAllDayOfWeeks, useDispatchGetAllSlots } from '~/hooks';
import { OptionPayload } from '~/models';
import { ClassStatusKeys } from '~/models/variables';
import globalStyles from '~/styles';
import { formatDate, formatISODateDateToDisplayDate } from '~/utils/date';
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

  const displayLineData: {
    id: number;
    name: string;
    value?: string;
    alt?: string;
    type?: 'text' | 'image' | 'timetable';
    timetable?: {
      slot: OptionPayload;
      dayOfWeek: OptionPayload;
    }[];
  }[] = [
    {
      id: 0,
      name: 'Mã khóa học',
      value: detailClass.code,
    },
    {
      id: 0,
      name: 'Tên lớp học',
      value: detailClass.name,
    },
    {
      id: 0,
      name: 'Hình ảnh',
      value: detailClass.imageUrl,
      alt: detailClass.imageAlt,
      type: 'image',
    },
    {
      id: 0,
      name: 'Ngày bắt đầu',
      value: formatDate(detailClass.startDate),
    },
    {
      id: 0,
      name: 'Ngày kết thúc',
      value: formatDate(detailClass.endDate),
    },
    {
      id: 0,
      name: 'Lĩnh vực',
      value: detailClass.categoryName,
    },
    {
      id: 0,
      name: 'Môn học',
      value: detailClass.subjectName,
    },
    {
      id: 0,
      name: 'Sớ buổi học',
      value: `${detailClass.numberOfSlot}`,
    },
    {
      id: 0,
      name: 'Số học sinh',
      value: `${detailClass.numberOfStudent}`,
    },
    {
      id: 0,
      name: 'Giá lớp học',
      value: formatMoney(detailClass.price),
    },
    {
      id: 0,
      name: 'Trạng thái',
      value: `${
        ClassStatusList.find((item) => item.value === detailClass.status)?.label
      }`,
    },
    {
      id: 0,
      name: 'Thời khóa biểu',
      timetable: detailClass.timetable,
      type: 'timetable',
    },
  ];

  return (
    <Stack>
      <Stack>
        <Typography sx={globalStyles.textTitle}>Thông tin khóa học</Typography>
        <Divider />
      </Stack>
      {displayLineData.map((item, index) => (
        <Stack key={index} sx={{ marginTop: 2 }}>
          <Typography
            sx={{
              fontSize: FontSize.small_14,
              fontFamily: FontFamily.bold,
            }}
          >
            {item.name}
          </Typography>
          <Typography
            sx={{
              marginTop: 1,
              ...globalStyles.textSmallLight,
              padding: 1,
              borderRadius: MetricSize.small_5,
              background: Color.whiteSmoke,
            }}
          >
            {item.type === 'image' && (
              <Box
                component="img"
                src={item.value}
                alt={item.alt}
                sx={{
                  width: '50%',
                  height: undefined,
                  aspectRatio: 16 / 9,
                  objectFit: 'cover',
                }}
              />
            )}
            {item.type === 'timetable' && (
              <Timetable
                data={
                  item.timetable?.map((time) => ({
                    dayOfWeekId: time.dayOfWeek.id,
                    slotId: time.slot.id,
                  })) || []
                }
              />
            )}
            {!item.type && item.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
