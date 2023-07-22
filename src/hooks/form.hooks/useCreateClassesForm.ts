import { useState } from 'react';

import { useForm } from 'react-hook-form';
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
  const { handleTryCatch: handleTryCatchTimetable } = useTryCatch(
    'thêm thời khóa biểu cho lớp học'
  );
  const { handleTryCatch: handleTryCatchCreateClass } =
    useTryCatch('tạo lớp học');

  const resolverCreateSubCourse = useYupValidationResolver(
    validationSchemaCreateSubCourse
  );
  const createSubCourseHookForm = useForm({
    defaultValues: defaultValueCreateSubCourse,
    resolver: resolverCreateSubCourse,
  });

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

  const checkEndDateValid = (
    startDate: string,
    endDate: string,
    numberOfSlot: number,
    timeInWeekRequests: {
      dayOfWeek: OptionPayload;
      slot: OptionPayload;
    }[]
  ) => {
    const sortArr = [...timeInWeekRequests];
    sortArr.sort((a, b) => {
      if (a.dayOfWeek.id === b.dayOfWeek.id) {
        return a.slot.id - b.slot.id;
      }
      return a.dayOfWeek.id - b.dayOfWeek.id;
    });

    const tmpStartDate = new Date(startDate);
    const startDay = tmpStartDate.getDay();
    const numberOfSlotInAWeek = timeInWeekRequests.length;
    const numberOfWeek = Math.floor(numberOfSlot / numberOfSlotInAWeek);
    const leftDay = numberOfSlot % numberOfSlotInAWeek;
    let endDateTime = null;
    if (leftDay === 0) {
      endDateTime = sortArr[sortArr.length - 1];
    } else {
      endDateTime = sortArr[leftDay - 1];
    }
    const numofLeftDate = endDateTime.dayOfWeek.id - startDay - 1;

    const numOfTotalDayCount = (numberOfWeek - 1) * 7 + numofLeftDate;
    const tmpEndDate = new Date();
    const endDatetExpected = new Date(endDate);
    tmpEndDate.setDate(tmpStartDate.getDate() + numOfTotalDayCount);

    console.log(
      'sortArr',
      sortArr,
      startDay,
      numberOfWeek,
      leftDay,
      endDateTime,
      numofLeftDate,
      tmpEndDate
    );

    // if (tmpEndDate.getTime() > endDatetExpected.getTime()) {
    //   setRecommendEndDate(formatDate(tmpEndDate.toISOString()));
    //   return false;
    // } else {
    //   return true;
    // }

    return true;
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
    if (
      checkEndDateValid(
        data.startDateExpected,
        data.endDateExpected,
        data.numberOfSlot,
        data.timeInWeekRequests
      )
    ) {
      try {
        const imageId = await uploadImage(data.imageId);

        if (imageId) {
          // TODO: Thêm api create class o day khi mà be xong
          const param: PostClassRequest = {
            endDate: data.endDateExpected,
            imageId,
            maxStudent: data.maxStudent,
            minStudent: data.minStudent,
            numberOfSlot: data.numberOfSlot,
            price: data.price,
            startDate: data.startDateExpected,
            timeInWeekRequests: data.timeInWeekRequests.map((item) => ({
              dayOfWeekId: item.dayOfWeek.id || 0,
              slotId: item.slot.id || 0,
            })),
            timeTableRequest: timetable?.raw || [],
          };
          await handleTryCatchCreateClass(async () =>
            handleCreateClass({
              id,
              param,
            })
          );
          await refetch();
          setTimetable(undefined);
          createSubCourseHookForm.reset();
        } else {
          toast.notifyErrorToast('Thêm hình ảnh không thành công !');
        }
      } catch (e: any) {
        toast.notifyErrorToast(`Thêm khóa học không thành công: ${e.message}`);
      }
    } else {
      toast.notifyErrorToast(
        `Ngày kêt thúc không hợp lệ. Lớp học nên kết thúc sau hoặc vào ngày ${recommendEndDate} `
      );
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
        dayOfWeekId: item.dayOfWeek.id,
        slotId: item.slot.id,
      })),
    };
    const responseTimetable = await handleTryCatchTimetable(() =>
      handleGetTimetable(result)
    );
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
