import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { validationSchemaCreateSubCourse } from '~/form/validation';
import { useYupValidationResolver } from '../useYupValidationResolver';
import { defaultValueCreateSubCourse } from '~/form/defaultValues';
import { mockLevelData, typeData } from '~/constants';
import { useMutationUploadImage } from '../useMutationUploadImage';
import { OptionPayload } from '~/models';
import toast from '~/utils/toast';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';

type Status = 'CREATE' | 'UPDATE' | 'DELETE';

export const useCreateClassesForm = (
  classes: DetailCourseClassPayload[],
  onChangeClass: (params: DetailCourseClassPayload[]) => void
) => {
  const levels = mockLevelData;
  const types = typeData;

  const [open, setOpen] = useState(false);
  const [recommendEndDate, setRecommendEndDate] = useState<string>('');
  const [mode, setMode] = useState<Status>('CREATE');

  const uploadImageMutation = useMutationUploadImage();

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
      dayInWeek: OptionPayload;
      slot: OptionPayload;
    }[]
  ) => {
    const sortArr = [...timeInWeekRequests];
    sortArr.sort((a, b) => {
      if (a.dayInWeek.id === b.dayInWeek.id) {
        return a.slot.id - b.slot.id;
      }
      return a.dayInWeek.id - b.dayInWeek.id;
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
    const numofLeftDate = endDateTime.dayInWeek.id - startDay - 1;

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
      dayInWeek: OptionPayload;
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
      const isUploadImaged = await uploadImage(data.imageId);
      if (isUploadImaged) {
        // TODO: Thêm api create class o day khi mà be xong
        // const param: SelectedClassPayload = {};
        // onChangeClass([...classes, param]);
      } else {
        toast.notifyErrorToast('Thêm hình ảnh không thành công !');
      }
    } else {
      toast.notifyErrorToast(
        `Ngày kêt thúc không hợp lệ. Lớp học nên kết thúc sau hoặc vào ngày ${recommendEndDate} `
      );
    }
  };

  return {
    createSubCourseHookForm,
    onTriggerModal,
    open,
    levels,
    types,
    onAddNewClass,
    mode,
  };
};