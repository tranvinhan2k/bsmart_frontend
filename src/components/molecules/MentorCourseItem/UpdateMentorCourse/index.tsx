import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Stack, Typography, Box } from '@mui/material';
import globalStyles from '~/styles';
import FormInput from '~/components/atoms/FormInput';
import { CREATE_SUB_COURSE_FIELDS } from '~/form/schema';
import { mockLevelData, typeData } from '~/constants';
import Button from '~/components/atoms/Button';
import { RequestUpdateCoursePayload } from '~/api/courses';
import { useQueryGetAllCategories, useQueryGetAllSubjects } from '~/hooks';
import CustomModal from '~/components/atoms/CustomModal';

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
  const { subjects } = useQueryGetAllSubjects();
  const { categories } = useQueryGetAllCategories();
  const hookForm = useForm({
    defaultValues: {
      ...item,
      categoryId: {
        id: item.category.id,
        label: item.category.name,
        value: item.category.value,
      },
      subjectId: {
        id: item.subject.id,
        label: item.subject.name,
        value: item.subject.value,
      },
      type: typeData.find((titem) => titem.value === item.typeLearn),
      timeInWeekRequests: item.timeInWeek.map((timeSlot: any) => ({
        dayInWeek: {
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

  const filterSubjects = subjects?.filter((subject: any) => {
    return subject.categoryId === chooseCategoryId;
  });

  useEffect(() => {
    setChooseCategoryId(categoryWatch?.id);
  }, [categoryWatch]);

  return (
    <CustomModal open={open} onClose={onClose}>
      <Stack sx={{ height: '80vh' }}>
        <Typography sx={globalStyles.textTitle}>Chỉnh sửa khóa học</Typography>

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
          label="Tên khóa học"
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
            label="Hình ảnh"
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
            onClick={hookForm.handleSubmit(onSubmit)}
            customVariant="horizonForm"
          >
            Cập nhật khóa học
          </Button>
        </Stack>
      </Stack>
    </CustomModal>
  );
}
