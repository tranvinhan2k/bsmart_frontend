import { IconButton, Modal, Stack, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { FontFamily, FontSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import CustomModal from '~/components/atoms/CustomModal';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import { CREATE_SUB_COURSE_FIELDS } from '~/form/schema';
import { OptionPayload } from '~/models';

interface CreateSubCourseModalProps {
  isOpen: boolean;
  hookForm: UseFormReturn<any, any>;
  levels: OptionPayload[];
  types: OptionPayload[];
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreateSubCourseModal({
  isOpen,
  hookForm,
  levels,
  types,

  onClose,
  onSubmit,
}: CreateSubCourseModalProps) {
  return (
    <CustomModal open={isOpen} onClose={onClose}>
      <Stack
        sx={{
          background: 'white',
          width: { sx: '100%' },
          alignSelf: 'center',
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: FontFamily.bold,
            fontSize: FontSize.large_45,
          }}
        >
          Tạo giờ học mới
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
        <Stack marginTop={2}>
          <FormInput
            variant="date"
            name={CREATE_SUB_COURSE_FIELDS.endDateExpected}
            control={hookForm.control}
            label="Ngày kết thúc dự kiến"
          />
        </Stack>
        <Stack marginTop={2}>
          <FormInput
            variant="number"
            name={CREATE_SUB_COURSE_FIELDS.price}
            control={hookForm.control}
            label="Giá khóa học"
          />
        </Stack>
        <Stack marginTop={2}>
          <FormInput
            variant="number"
            name={CREATE_SUB_COURSE_FIELDS.minStudent}
            control={hookForm.control}
            label="Số học sinh tối thiểu"
          />
        </Stack>
        <Stack marginTop={2}>
          <FormInput
            variant="number"
            name={CREATE_SUB_COURSE_FIELDS.maxStudent}
            control={hookForm.control}
            label="Số học sinh tối đa"
          />
        </Stack>
        <Stack marginTop={2}>
          <FormInput
            data={levels}
            variant="radioGroup"
            name={CREATE_SUB_COURSE_FIELDS.level}
            control={hookForm.control}
            label="Trình độ"
          />
        </Stack>
        <Stack marginTop={2}>
          <FormInput
            variant="image"
            name={CREATE_SUB_COURSE_FIELDS.imageId}
            control={hookForm.control}
            label="Hình ảnh"
          />
        </Stack>
        <Stack marginTop={2}>
          <FormInput
            data={types}
            variant="dropdown"
            name={CREATE_SUB_COURSE_FIELDS.type}
            control={hookForm.control}
            label="Hình thức khóa học"
          />
        </Stack>
        <Stack marginTop={2}>
          <FormInput
            name={CREATE_SUB_COURSE_FIELDS.numberOfSlot}
            variant="number"
            control={hookForm.control}
            label="Số buổi học"
          />
        </Stack>
        <Stack marginTop={2}>
          <FormInput
            name={CREATE_SUB_COURSE_FIELDS.timeInWeekRequests}
            variant="timetable"
            control={hookForm.control}
            label="Thời khóa biểu"
          />
        </Stack>
        <Button
          onClick={hookForm.handleSubmit(onSubmit)}
          customVariant="horizonForm"
        >
          Tạo giờ học
        </Button>
      </Stack>
    </CustomModal>
  );
}
