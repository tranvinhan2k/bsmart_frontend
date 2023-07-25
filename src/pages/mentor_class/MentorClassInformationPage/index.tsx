import { Alert, Box, FormHelperText, Stack } from '@mui/material';
import { useContext, useState } from 'react';
import { ClassContext } from '~/HOCs/context/ClassContext';
import Button from '~/components/atoms/Button';
import ClassStatusAlert from '~/components/atoms/ClassStatusAlert';
import CustomModal from '~/components/atoms/CustomModal';
import TextTitle from '~/components/atoms/texts/TextTitle';
import ClassInformationList from '~/components/molecules/ClassInformationList';
import MonthSchedule, {
  MonthTimeSlotPayload,
} from '~/components/molecules/schedules/MonthSchedule';
import {
  useCreateCourseClass,
  useDispatchGetAllDayOfWeeks,
  useDispatchGetAllSlots,
  useMutationOpenNotStartClass,
  useTryCatch,
} from '~/hooks';
import { PostTimeTableResponse } from '~/models/response';
import { ClassStatusKeys } from '~/models/variables';
import globalStyles from '~/styles';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';

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
  timetable: { dayOfWeekId: number; slotId: number }[];
}

export default function MentorClassInformationPage() {
  const [open, setOpen] = useState<boolean>(false);

  const [timetable, setTimeTable] = useState<{
    raw: PostTimeTableResponse;
    timetable: MonthTimeSlotPayload[];
  }>();

  const { optionSlots } = useDispatchGetAllSlots();
  const { optionDayOfWeeks } = useDispatchGetAllDayOfWeeks();
  const { detailClass: contextDetailClass, refetch } = useContext(ClassContext);

  const { mutateAsync: handleMutationOpenClass } =
    useMutationOpenNotStartClass();

  const { handleTryCatch } = useTryCatch('mở lớp');

  const detailClass: MentorClassInformationPayload = {
    categoryName: 'Front End',
    code: `#${contextDetailClass?.code}`,
    endDate: contextDetailClass?.endDate || '',
    startDate: contextDetailClass?.startDate || '',
    id: contextDetailClass?.id || 0,
    imageAlt: contextDetailClass?.imageAlt || '',
    imageUrl: contextDetailClass?.imageUrl || '',
    name: contextDetailClass?.name || '',
    numberOfSlot: contextDetailClass?.numberOfSlot || 0,
    numberOfStudent: contextDetailClass?.numberOfStudent || 0,
    price: contextDetailClass?.price || 0,
    status: contextDetailClass?.status || 'ALL',
    subjectName: 'Java',
    timetable: contextDetailClass?.timeTablesRequest || [],
  };

  const handleTriggerModal = async () => {
    setOpen(!open);
  };

  const { handleGetTimetable: handleMutationGetTimetable } =
    useCreateCourseClass();

  const handleGetTimetable = async () => {
    const response = await handleMutationGetTimetable({
      startDate: detailClass.startDate,
      endDate: detailClass.endDate,
      numberOfSlot: detailClass.numberOfSlot,
      timeInWeekRequests: detailClass.timetable,
    });
    handleTriggerModal();

    setTimeTable(response);
  };

  const handleAddTimetable = async () => {
    await handleTryCatch(async () => {
      await handleMutationOpenClass({
        id: detailClass.id,
        params: timetable?.raw,
      });
      handleTriggerModal();
      if (refetch) {
        await refetch();
      }
    });
  };

  return (
    <Stack>
      <TextTitle title="Nội dung khóa học" />
      {detailClass.status === 'NOTSTART' ? (
        <ClassStatusAlert
          status={detailClass.status}
          startDate={new Date().toISOString()}
          onGetClassSchedule={handleGetTimetable}
        />
      ) : (
        <ClassStatusAlert
          status={detailClass.status}
          startDate={detailClass.startDate}
        />
      )}
      <CustomModal open={open} onClose={handleTriggerModal}>
        <Stack
          sx={{
            height: '92vh',
          }}
        >
          <Stack sx={{ height: '85%', overflow: 'auto' }}>
            <MonthSchedule data={timetable?.timetable || []} />
          </Stack>
          <Stack>
            <Button
              sx={{
                marginTop: 1,
              }}
              onClick={handleAddTimetable}
              variant="contained"
              color="success"
            >
              Xác nhận mở lớp
            </Button>
            <FormHelperText>
              Lưu ý: Lớp học hiện tại chưa đủ số lượng học sinh tối thiểu mặc dù
              đã đủ tới thời gian nhập học. Khi bấm vào nút trên lớp bạn sẽ được
              phép mở với số lượng học sinh hiện tại
            </FormHelperText>
          </Stack>
        </Stack>
      </CustomModal>
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
