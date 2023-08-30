import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { validationSchemaCreateSubCourse } from '~/form/validation';
import { useYupValidationResolver } from '../useYupValidationResolver';
import { defaultValueCreateSubCourse } from '~/form/defaultValues';
import { OptionPayload } from '~/models';
import { useMutationUploadClassImage } from '../image/useMutationUploadClassImage';
import { PostClassRequest } from '~/models/request';
import { useTryCatch } from '../useTryCatch';
import { useUpdateClass } from '../class/useUpdateClass';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import { useDispatchGetAllDayOfWeeks } from '../useDispatchGetAllDayOfWeeks';
import { useDispatchGetAllSlots } from '../useDispatchGetAllSlots';
import { generateEndDate } from '~/utils/date';

export const useUpdateMentorClassesForm = (
  id: number,
  classes: DetailCourseClassPayload[] | undefined
) => {
  const { optionDayOfWeeks } = useDispatchGetAllDayOfWeeks();
  const { optionSlots } = useDispatchGetAllSlots();

  const mutationUpdate = useUpdateClass();

  const uploadImageMutation = useMutationUploadClassImage();
  const { handleTryCatch: handleUpdateTryCatch } =
    useTryCatch('cập nhật lớp học');

  const resolverCreateSubCourse = useYupValidationResolver(
    validationSchemaCreateSubCourse
  );
  const updateClassHookForm = useForm({
    defaultValues: defaultValueCreateSubCourse,
    resolver: resolverCreateSubCourse,
  });

  const startDate = updateClassHookForm.watch('startDateExpected');
  const numberOfSlot = updateClassHookForm.watch('numberOfSlot');
  const timeInWeekRequests = updateClassHookForm.watch('timeInWeekRequests');

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

      updateClassHookForm.setValue('endDateExpected', endDate);
    }
  }, [startDate, numberOfSlot, timeInWeekRequests, updateClassHookForm]);

  const handleChangeDefaultValue = (paramId: number) => {
    const tmpClass = classes?.find((item) => item.id === paramId);

    updateClassHookForm.reset({
      ...tmpClass,
      id: tmpClass?.id || 0,
      numberOfSlot: tmpClass?.numberOfSlot,
      startDateExpected: tmpClass?.startDate,
      endDateExpected: tmpClass?.endDate,
      imageOldId: tmpClass?.imageId,
      imageId: tmpClass?.imageUrl,
      timeInWeekRequests: tmpClass?.timeInWeekRequests.map((item) => ({
        dayOfWeek: optionDayOfWeeks.find(
          (subItem) => subItem.id === item.dayOfWeekId
        ),
        slot: optionSlots.find((subItem) => subItem.id === item.slotId),
      })),
    });
  };

  const uploadImage = async (imageId: string) => {
    try {
      const formData = new FormData();
      formData.append('type', 'COURSE');
      formData.append('file', imageId);
      const imageResponse = await uploadImageMutation.mutateAsync(formData);
      return imageResponse.id;
    } catch (error) {
      return undefined;
    }
  };

  const onUpdateClass = async (data: {
    imageOldId: number;
    price: number;
    type: OptionPayload;
    imageId: string;
    minStudent: number;
    maxStudent: number;
    level: OptionPayload;
    startDateExpected: string;
    endDateExpected: string;
    link: string;
    numberOfSlot: number;
    timeInWeekRequests: {
      dayOfWeek: OptionPayload;
      slot: OptionPayload;
    }[];
  }) => {
    let imageId: number | undefined;

    if (typeof data.imageId === 'object') {
      try {
        imageId = await uploadImage(data.imageId);
        // eslint-disable-next-line no-empty
      } catch (error: any) {}
    } else {
      imageId = data.imageOldId;
    }

    const param: PostClassRequest = {
      imageId,
      maxStudent: data.maxStudent,
      minStudent: data.minStudent,
      numberOfSlot: data.numberOfSlot,
      link: data.link,
      price: data.price,
      startDate: dayjs(data.startDateExpected).add(1, 'day').toISOString(),
      endDate: dayjs(data.endDateExpected).add(1, 'day').toISOString(),

      timeInWeekRequests: data.timeInWeekRequests.map((item) => ({
        dayOfWeekId: item.dayOfWeek.id,
        slotId: item.slot.id,
      })),
    };
    await handleUpdateTryCatch(async () =>
      mutationUpdate.mutateAsync({
        id,
        param,
      })
    );
    updateClassHookForm.reset();
  };

  return {
    handleChangeDefaultValue,
    updateClassHookForm,
    onUpdateClass,
  };
};
