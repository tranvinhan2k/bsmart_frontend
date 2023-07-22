import { Stack } from '@mui/material';
import TextTitle from '~/components/atoms/texts/TextTitle';
import ClassInformationList from '~/components/molecules/ClassInformationList';
import { image } from '~/constants/image';
import { MentorClassInformationPayload } from '~/pages/mentor_class/MentorClassInformationPage';

export default function MemberClassInformationPage() {
  const detailClass: MentorClassInformationPayload = {
    categoryName: '',
    code: '',
    endDate: '',
    id: 0,
    imageAlt: '',
    imageUrl: image.mockClass,
    name: '',
    numberOfSlot: 0,
    numberOfStudent: 0,
    price: 0,
    startDate: '',
    status: 'ALL',
    subjectName: '',
    timetable: [
      {
        dayOfWeek: {
          id: 0,
          label: '',
          value: '',
        },
        slot: {
          id: 0,
          label: '',
          value: '',
        },
      },
    ],
  };

  return (
    <Stack>
      <TextTitle title="Thông tin lớp học" />
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
  );
}
