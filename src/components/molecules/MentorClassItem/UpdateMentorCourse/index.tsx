import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Stack, Typography } from '@mui/material';
import CustomModal from '~/components/atoms/CustomModal';
import globalStyles from '~/styles';
import FormInput from '~/components/atoms/FormInput';
import { CREATE_SUB_COURSE_FIELDS } from '~/form/schema';
import { mockLevelData, typeData } from '~/constants';
import Button from '~/components/atoms/Button';
import {
  useDispatchGetAllCategories,
  useDispatchGetAllSubjects,
  useYupValidationResolver,
} from '~/hooks';
import {
  validationSchemaUpdateWaitingCourse,
  validationSchemaUpdateWaitingCoursePrivate,
} from '~/form/validation';

interface UpdateMentorCourseProps {
  item: any;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function UpdateMentorCourse({
  open,
  item,
  onSubmit,
  onClose,
}: UpdateMentorCourseProps) {
  const { optionSubjects: optionDataSubjects } = useDispatchGetAllSubjects();
  const { optionCategories: categories } = useDispatchGetAllCategories();
  const resolver = useYupValidationResolver(
    item.courseType === 'PUBLIC'
      ? validationSchemaUpdateWaitingCourse
      : validationSchemaUpdateWaitingCoursePrivate
  );

  const hookForm = useForm({
    resolver,
    defaultValues: {
      ...item,
      categoryId: {
        id: item?.categoryDtoList?.[0]?.id,
        label: item.categoryDtoList?.[0]?.name,
        value: item.categoryDtoList?.[0]?.value,
      },
      subjectId: {
        id: item.subject.id,
        label: item.subject.name,
        value: item.subject.value,
      },
      type: typeData.find((titem) => titem.value === item.typeLearn),
      timeInWeekRequests: item.timeInWeek.map((timeSlot: any) => ({
        dayOfWeek: {
          id: timeSlot.dayOfWeek.id,
          label: timeSlot.dayOfWeek.name,
          value: `${timeSlot.dayOfWeek.id}`,
        },
        slot: {
          id: timeSlot.slot.id,
          label: `${timeSlot.slot.startTime} - ${timeSlot.slot.endTime}`,
          value: `${timeSlot.id}`,
        },
      })),
    },
  });
  const categoryWatch = hookForm.watch('categoryId');
  const [chooseCategoryId, setChooseCategoryId] = useState();

  const filterSubjects = optionDataSubjects?.filter((subject: any) => {
    return subject.categoryIds?.includes(chooseCategoryId || 0);
  });

  useEffect(() => {
    setChooseCategoryId(categoryWatch?.id);
  }, [categoryWatch]);

  return (
    <CustomModal open={open} onClose={onClose}>
      <Stack sx={{ height: '80vh' }}>
        <Typography sx={globalStyles.textTitle}>Chỉnh sửa khóa học</Typography>

        {item.courseType === 'PRIVATE' && (
          <>
            <FormInput
              variant="text"
              name="courseCode"
              control={hookForm.control}
              label="Mã khóa học"
            />
            <FormInput
              variant="text"
              name="courseName"
              control={hookForm.control}
              label="Tên khóa học"
            />
            <FormInput
              variant="multiline"
              name="courseDescription"
              control={hookForm.control}
              label="Miêu tả khóa học"
            />
          </>
        )}
        <FormInput
          name="subCourseTitle"
          control={hookForm.control}
          label="Tên buổi học"
        />
        <FormInput
          variant="dropdown"
          name="categoryId"
          control={hookForm.control}
          label="Môn học"
          data={categories}
        />
        <FormInput
          variant="dropdown"
          name="subjectId"
          control={hookForm.control}
          label="Ngôn ngữ lập trình"
          data={filterSubjects}
        />
        <Stack paddingTop={1}>
          <FormInput
            variant="date"
            name={CREATE_SUB_COURSE_FIELDS.startDateExpected}
            control={hookForm.control}
            label="Ngày mở lớp dự kiến"
          />
        </Stack>
        <Stack paddingTop={1}>
          <FormInput
            variant="date"
            name={CREATE_SUB_COURSE_FIELDS.endDateExpected}
            control={hookForm.control}
            label="Ngày kết thúc dự kiến"
          />
        </Stack>
        <Stack paddingTop={1}>
          <FormInput
            variant="number"
            name={CREATE_SUB_COURSE_FIELDS.price}
            control={hookForm.control}
            label="Giá khóa học"
          />
        </Stack>
        <Stack paddingTop={1}>
          <FormInput
            variant="number"
            name={CREATE_SUB_COURSE_FIELDS.minStudent}
            control={hookForm.control}
            label="Số học sinh tối thiểu"
          />
        </Stack>
        <Stack paddingTop={1}>
          <FormInput
            variant="number"
            name={CREATE_SUB_COURSE_FIELDS.maxStudent}
            control={hookForm.control}
            label="Số học sinh tối đa"
          />
        </Stack>
        <Stack paddingTop={1}>
          <FormInput
            data={mockLevelData}
            variant="radioGroup"
            name={CREATE_SUB_COURSE_FIELDS.level}
            control={hookForm.control}
            label="Trình độ"
          />
        </Stack>
        <Stack paddingTop={1}>
          <FormInput
            variant="image"
            name={CREATE_SUB_COURSE_FIELDS.imageUrl}
            control={hookForm.control}
            label="Hình ảnh khóa học"
          />
        </Stack>
        <Stack paddingTop={1}>
          <FormInput
            data={typeData}
            variant="dropdown"
            name={CREATE_SUB_COURSE_FIELDS.type}
            control={hookForm.control}
            label="Hình thức khóa học"
          />
        </Stack>
        <Stack paddingTop={1}>
          <FormInput
            name={CREATE_SUB_COURSE_FIELDS.numberOfSlot}
            variant="number"
            control={hookForm.control}
            label="Số buổi học"
          />
        </Stack>
        <Stack paddingTop={1}>
          <FormInput
            name={CREATE_SUB_COURSE_FIELDS.timeInWeekRequests}
            variant="timetable"
            control={hookForm.control}
            label="Thời khóa biểu"
          />
        </Stack>
        <Stack marginTop={2}>
          <Button
            onClick={hookForm.handleSubmit(onSubmit, (e) => {
              console.log(e);
            })}
            customVariant="horizonForm"
          >
            Cập nhật khóa học
          </Button>
        </Stack>
      </Stack>
    </CustomModal>
  );
}
