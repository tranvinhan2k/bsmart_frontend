import { FormHelperText, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClassContext } from '~/HOCs/context/ClassContext';
import Button from '~/components/atoms/Button';
import ClassStatusAlert from '~/components/atoms/ClassStatusAlert';
import CustomModal from '~/components/atoms/CustomModal';
import FormInput from '~/components/atoms/FormInput';
import TextTitle from '~/components/atoms/texts/TextTitle';
import ClassInformationList from '~/components/molecules/ClassInformationList';
import MonthSchedule, {
  MonthTimeSlotPayload,
} from '~/components/molecules/schedules/MonthSchedule';
import { validationAddPromoCode, validationCheckUrl } from '~/form/validation';
import {
  useCreateCourseClass,
  useDispatchGetAllSubjects,
  useMutationOpenNotStartClass,
  useTryCatch,
  useYupValidationResolver,
} from '~/hooks';
import { PostTimeTableResponse } from '~/models/response';
import { ClassStatusKeys } from '~/models/variables';
import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';

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
  price: number;
  imageUrl: string;
  imageAlt: string;
  timetable: { dayOfWeekId: number; slotId: number }[];
}

export default function MentorClassInformationPage() {
  const resolver = useYupValidationResolver(validationCheckUrl);
  const { control, handleSubmit } = useForm({
    resolver,
  });
  const [open, setOpen] = useState<boolean>(false);

  const [timetable, setTimeTable] = useState<{
    raw: PostTimeTableResponse;
    timetable: MonthTimeSlotPayload[];
  }>();

  const { detailClass: contextDetailClass, refetch } = useContext(ClassContext);

  const { mutateAsync: handleMutationOpenClass } =
    useMutationOpenNotStartClass();

  const { handleTryCatch } = useTryCatch('mở lớp');

  const { subjects } = useDispatchGetAllSubjects();
  const subject = subjects.find(
    (item) => item.id === contextDetailClass?.id || 0
  );
  const detailClass: MentorClassInformationPayload = {
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
    subjectName: subject?.name || '',
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

  const onSubmit = (data: any) => {};

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
        <Typography sx={globalStyles.textSmallLabel}>
          Thay đổi đường dẫn Google Meet
        </Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <FormInput control={control} name="link" />
          <Button
            onClick={handleSubmit(onSubmit, handleConsoleError)}
            sx={{
              marginLeft: 1,
            }}
            variant="contained"
          >
            Thay đổi đường dẫn
          </Button>
        </Stack>
      </Stack>
      <Stack marginTop={1} sx={globalStyles.viewRoundedWhiteBody}>
        <ClassInformationList
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
