import { useForm } from 'react-hook-form';
import { Stack, Typography, Box } from '@mui/material';
import CustomModal from '~/components/atoms/Modal';
import { MetricSize } from '~/assets/variables';
import globalStyles from '~/styles';
import FormInput from '~/components/atoms/FormInput';
import { CREATE_SUB_COURSE_FIELDS } from '~/form/schema';
import { mockLevelData, typeData } from '~/constants';
import Button from '~/components/atoms/Button';

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
  const hookForm = useForm();
  return (
    <CustomModal open={open} onClose={onClose}>
      <Stack sx={{ height: '80vh' }}>
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
              onClick={hookForm.handleSubmit(onSubmit)}
              customVariant="horizonForm"
            >
              Cập nhật khóa học
            </Button>
          </Box>
        </Stack>

        {/* {JSON.stringify(data)} */}
      </Stack>
    </CustomModal>
  );
}
