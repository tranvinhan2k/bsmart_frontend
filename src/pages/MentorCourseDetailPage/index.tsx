import { Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import { mockLevelData, typeData } from '~/constants';
import { CREATE_SUB_COURSE_FIELDS } from '~/form/schema';
import useCRUDMentorCourse from '~/hooks/useCRUDMentorCourse';
import globalStyles from '~/styles';
import { scrollToTop } from '~/utils/common';

export default function MentorCourseDetailPage() {
  const { id } = useParams();
  const {
    data,
    deleteCourseMutation,
    error,
    isLoading,
    refetch,
    requestCourseMutation,
    updateCourseMutation,
  } = useCRUDMentorCourse(parseInt(`${id}`, 10));

  const hookForm = useForm();

  const handleUpdateCourse = (updateData: any) => {
    console.log(updateData);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  console.log(data);

  return (
    <Stack
      sx={{
        boxShadow: 3,
        padding: MetricSize.medium_15,
      }}
    >
      <Typography sx={globalStyles.textTitle}>Chỉnh sửa khóa học</Typography>

      <FormInput
        variant="text"
        name={CREATE_SUB_COURSE_FIELDS.subCourseTile}
        control={hookForm.control}
        label="Tên khóa học phụ"
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
        \
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
          name={CREATE_SUB_COURSE_FIELDS.imageId}
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
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: 1,
        }}
      >
        <Box>
          <Button
            onClick={hookForm.handleSubmit(handleUpdateCourse)}
            customVariant="horizonForm"
          >
            Cập nhật giờ học
          </Button>
        </Box>
      </Stack>

      {/* {JSON.stringify(data)} */}
    </Stack>
  );
}
