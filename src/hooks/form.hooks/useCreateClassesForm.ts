import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { validationSchemaCreateSubCourse } from '~/form/validation';
import { useYupValidationResolver } from '../useYupValidationResolver';
import { defaultValueCreateSubCourse } from '~/form/defaultValues';
import { OptionPayload } from '~/models';
import toast from '~/utils/toast';
import { useMutationUploadClassImage } from '../image/useMutationUploadClassImage';
import { PostClassRequest, PostTimetableRequest } from '~/models/request';
import { useTryCatch } from '../useTryCatch';
import { useCreateCourseClass } from '../class/useCreateCourseClass';
import { PostTimeTableResponse } from '~/models/response';
import { MonthTimeSlotPayload } from '~/components/molecules/schedules/MonthSchedule';
import { generateEndDate } from '~/utils/date';

type Status = 'CREATE' | 'UPDATE' | 'DELETE';

export const useCreateClassesForm = (id: number, refetch: any) => {
  const [open, setOpen] = useState(false);
  const [recommendEndDate, setRecommendEndDate] = useState<string>('');
  const [mode, setMode] = useState<Status>('CREATE');
  const [selectClassId, setSelectClassId] = useState<number>(-1);
  const [timetable, setTimetable] = useState<{
    raw: PostTimeTableResponse;
    timetable: MonthTimeSlotPayload[];
  }>();

  const { handleCreateClass, handleGetTimetable } = useCreateCourseClass();

  const uploadImageMutation = useMutationUploadClassImage();

  const { handleTryCatch: handleTryCatchCreateClass } =
    useTryCatch('tạo lớp học');

  const resolverCreateSubCourse = useYupValidationResolver(
    validationSchemaCreateSubCourse
  );
  const createSubCourseHookForm = useForm({
    defaultValues: defaultValueCreateSubCourse,
    resolver: resolverCreateSubCourse,
  });

  const startDate = createSubCourseHookForm.watch('startDateExpected');
  const numberOfSlot = createSubCourseHookForm.watch('numberOfSlot');
  const timeInWeekRequests =
    createSubCourseHookForm.watch('timeInWeekRequests');

  useEffect(() => {
    if (
      startDate !== '' &&
      numberOfSlot !== 0 &&
      timeInWeekRequests.length !== 0
    ) {
      const endDate = generateEndDate({
        startDate,
        numberOfSlot,
        timeInWeekRequests: (timeInWeekRequests as any[]).map((item) => ({
          slotId: item?.slot?.id,
          dayOfWeekId: item?.dayOfWeek?.id,
        })),
      });

      createSubCourseHookForm.setValue(
        'endDateExpected',
        endDate.toISOString()
      );
    } else {
      createSubCourseHookForm.setValue('endDateExpected', '');
    }
  }, [startDate, numberOfSlot, timeInWeekRequests, createSubCourseHookForm]);

  const onTriggerModal = (modeParam?: Status) => {
    setOpen(!open);
    if (modeParam) {
      setMode(modeParam);
    }
  };

  const uploadImage = async (imageId: string) => {
    try {
      const formData = new FormData();
      formData.append('type', 'COURSE');
      formData.append('file', imageId);
      const imageResponse = await uploadImageMutation.mutateAsync(formData);
      return imageResponse.id;
    } catch (error) {
      return null;
    }
  };

  const onAddNewClass = async (data: {
    price: number;
    type: OptionPayload;
    imageId: string;
    minStudent: number;
    maxStudent: number;
    level: OptionPayload;
    startDateExpected: string;
    endDateExpected: string;
    numberOfSlot: number;
    timeInWeekRequests: {
      dayOfWeek: OptionPayload;
      slot: OptionPayload;
    }[];
  }) => {
    try {
      const imageId = await uploadImage(data.imageId);

      if (imageId) {
        const param: PostClassRequest = {
          imageId,
          maxStudent: data.maxStudent,
          minStudent: data.minStudent,
          numberOfSlot: data.numberOfSlot,
          price: data.price,
          startDate: dayjs(data.startDateExpected).add(1, 'day').toISOString(),
          endDate: dayjs(data.endDateExpected).add(1, 'day').toISOString(),
          timeInWeekRequests: data.timeInWeekRequests.map((item) => ({
            dayOfWeekId: item?.dayOfWeek?.id || 0,
            slotId: item?.slot?.id || 0,
          })),
          // timeTableRequest: timetable?.raw || [],
        };
        await handleTryCatchCreateClass(async () => {
          await handleCreateClass({
            id,
            param,
          });
          await refetch();
          setOpen(!open);
          createSubCourseHookForm.reset();
        });

        setTimetable(undefined);
      } else {
        toast.notifyErrorToast('Thêm hình ảnh không thành công !');
      }
    } catch (e: any) {
      toast.notifyErrorToast(`Thêm khóa học không thành công: ${e.message}`);
    }
  };

  const handleAddTimetable = async (data: {
    price: number;
    type: OptionPayload;
    imageId: string;
    minStudent: number;
    maxStudent: number;
    level: OptionPayload;
    startDateExpected: string;
    endDateExpected: string;
    numberOfSlot: number;
    timeInWeekRequests: {
      dayOfWeek: OptionPayload;
      slot: OptionPayload;
    }[];
  }) => {
    const result: PostTimetableRequest = {
      endDate: data.endDateExpected,
      numberOfSlot: data.numberOfSlot,
      startDate: data.startDateExpected,
      timeInWeekRequests: data.timeInWeekRequests.map((item) => ({
        dayOfWeekId: item?.dayOfWeek?.id,
        slotId: item?.slot?.id,
      })),
    };
    const responseTimetable = await handleGetTimetable(result);
    setTimetable(responseTimetable || undefined);
  };

  const handleBackCreateCourse = () => {
    setTimetable(undefined);
  };
  const handleResetCreateCourse = () => {
    setTimetable(undefined);
    createSubCourseHookForm.reset();
  };

  return {
    timetable: timetable?.timetable,
    handleAddTimetable,
    handleResetCreateCourse,
    handleBackCreateCourse,
    createSubCourseHookForm,
    onTriggerModal,
    open,
    onAddNewClass,
    mode,
  };
};
