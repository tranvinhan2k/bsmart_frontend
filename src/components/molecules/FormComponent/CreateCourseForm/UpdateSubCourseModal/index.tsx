import { IconButton, Modal, Stack, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import { CREATE_SUB_COURSE_FIELDS } from '~/form/schema';
import { OptionPayload } from '~/models';

interface UpdateSubCourseModalProps {
  index: number;
  hookForm: UseFormReturn<any, any>;
  levels: OptionPayload[];
  types: OptionPayload[];
  subjects: OptionPayload[] | undefined;
  onClose: () => void;
  onUpdate: (data: any) => void;
  onDelete: () => void;
}

export default function UpdateSubCourseModal({
  index,
  hookForm,
  levels,
  subjects,
  types,
  onClose,
  onDelete,
  onUpdate,
}: UpdateSubCourseModalProps) {
  return (
    <Modal
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderRadius: '10px',
        boxShadow: 3,
      }}
      open={index !== -1}
      onClose={onClose}
    >
      <Stack
        sx={{
          background: 'white',
          width: { sx: '100%', md: '50vw' },
          padding: '20px',
          height: '90vh',
          alignSelf: 'center',
          overflowY: 'scroll',
        }}
      >
        <Stack>
          <IconButton sx={{ alignSelf: 'flex-end' }} onClick={onClose}>
            <Icon name="close" color="black" size="medium" />
          </IconButton>
        </Stack>
        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: FontFamily.bold,
            fontSize: FontSize.large_45,
          }}
        >
          Cập nhật giờ học
        </Typography>
        <FormInput
          variant="text"
          name={CREATE_SUB_COURSE_FIELDS.subCourseTile}
          control={hookForm.control}
          label="Tên khóa học phụ"
        />
        <FormInput
          variant="date"
          name={CREATE_SUB_COURSE_FIELDS.startDateExpected}
          control={hookForm.control}
          label="Ngày mở lớp dự kiến"
        />
        <FormInput
          variant="date"
          name={CREATE_SUB_COURSE_FIELDS.endDateExpected}
          control={hookForm.control}
          label="Ngày kết thúc dự kiến"
        />
        <FormInput
          variant="number"
          name={CREATE_SUB_COURSE_FIELDS.price}
          control={hookForm.control}
          label="Giá khóa học"
        />
        <FormInput
          variant="number"
          name={CREATE_SUB_COURSE_FIELDS.minStudent}
          control={hookForm.control}
          label="Số học sinh tối thiểu"
        />
        <FormInput
          variant="number"
          name={CREATE_SUB_COURSE_FIELDS.maxStudent}
          control={hookForm.control}
          label="Số học sinh tối đa"
        />
        <FormInput
          data={levels}
          variant="radioGroup"
          name={CREATE_SUB_COURSE_FIELDS.level}
          control={hookForm.control}
          label="Trình độ"
        />
        <FormInput
          variant="image"
          name={CREATE_SUB_COURSE_FIELDS.imageId}
          control={hookForm.control}
          label="Hình ảnh"
        />
        <FormInput
          data={subjects}
          variant="dropdown"
          name={CREATE_SUB_COURSE_FIELDS.subjectId}
          control={hookForm.control}
          label="Ngôn ngữ lập trình"
        />
        <FormInput
          data={types}
          variant="dropdown"
          name={CREATE_SUB_COURSE_FIELDS.type}
          control={hookForm.control}
          label="Hình thức khóa học"
        />
        <FormInput
          name={CREATE_SUB_COURSE_FIELDS.numberOfSlot}
          variant="number"
          control={hookForm.control}
          label="Số buổi học"
        />
        <FormInput
          name={CREATE_SUB_COURSE_FIELDS.timeInWeekRequests}
          variant="timetable"
          control={hookForm.control}
          label="Thời khóa biểu"
        />
        <Button
          onClick={hookForm.handleSubmit(onUpdate)}
          customVariant="normal"
        >
          Cập nhật giờ học
        </Button>
        <Stack sx={{ marginTop: MetricSize.medium_15 }}>
          <Button onClick={onDelete} customVariant="outlined">
            Xóa giờ học
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
