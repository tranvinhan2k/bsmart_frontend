import { Stack, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import CustomModal from '~/components/atoms/CustomModal';
import FormInput from '~/components/atoms/FormInput';
import { CREATE_CLASS_FIELDS } from '~/form/schema';
import { OptionPayload } from '~/models';
import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';

interface UpdateClassModalProps {
  open: boolean;
  hookForm: UseFormReturn<any, any>;
  levels: OptionPayload[];
  types: OptionPayload[];
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function UpdateClassModal({
  open,
  hookForm,
  levels,
  types,

  onClose,
  onSubmit,
}: UpdateClassModalProps) {
  return (
    <CustomModal open={open} onClose={onClose}>
      <Stack
        sx={{
          background: 'white',
          // width: { xs: '100%', md: '60vw' },
          paddingX: 4,
        }}
      >
        <Typography sx={globalStyles.textSubTitle}>Cập nhật lớp học</Typography>
        <Typography sx={globalStyles.textLowSmallLight}>
          Cập nhật thông tin lớp học.
        </Typography>
        <Stack paddingY={2}>
          <Stack>
            <Typography sx={globalStyles.textSmallLabel}>
              Thông tin chung
            </Typography>
          </Stack>
          <Stack>
            <FormInput
              variant="number"
              name={CREATE_CLASS_FIELDS.price}
              control={hookForm.control}
              label="Giá khóa học"
            />
          </Stack>
          <Stack marginTop={2} />
          <FormInput
            data={types}
            variant="dropdown"
            name={CREATE_CLASS_FIELDS.type}
            control={hookForm.control}
            label="Hình thức khóa học"
          />
          <Stack marginTop={2} />
          <FormInput
            variant="image"
            name={CREATE_CLASS_FIELDS.imageId}
            control={hookForm.control}
            label="Hình ảnh"
          />
          <Stack marginTop={2} />
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            <FormInput
              variant="number"
              name={CREATE_CLASS_FIELDS.minStudent}
              control={hookForm.control}
              label="Số học sinh tối thiểu"
            />
            <FormInput
              variant="number"
              name={CREATE_CLASS_FIELDS.maxStudent}
              control={hookForm.control}
              label="Số học sinh tối đa"
            />
          </Stack>
          <Stack marginTop={2} />
          <FormInput
            data={levels}
            variant="radioGroup"
            name={CREATE_CLASS_FIELDS.level}
            control={hookForm.control}
            label="Trình độ"
          />
          <Stack marginTop={2} />
          <Typography sx={globalStyles.textSmallLabel}>
            Thông tin giờ học
          </Typography>
          <Stack
            sx={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              gap: 1,
            }}
          >
            <FormInput
              variant="date"
              name={CREATE_CLASS_FIELDS.startDateExpected}
              control={hookForm.control}
              label="Ngày mở lớp dự kiến"
            />
            <FormInput
              variant="date"
              name={CREATE_CLASS_FIELDS.endDateExpected}
              control={hookForm.control}
              label="Ngày kết thúc dự kiến"
            />
          </Stack>
          <Stack marginTop={2} />
          <FormInput
            name={CREATE_CLASS_FIELDS.numberOfSlot}
            variant="number"
            control={hookForm.control}
            label="Số buổi học"
          />
          <Stack marginTop={2} />
          <FormInput
            name={CREATE_CLASS_FIELDS.timeInWeekRequests}
            variant="timetable"
            control={hookForm.control}
            label="Thời khóa biểu"
          />
          <Stack marginTop={2} />
          <Button
            onClick={hookForm.handleSubmit(onSubmit, handleConsoleError)}
            customVariant="horizonForm"
          >
            Tạo giờ học
          </Button>
        </Stack>
      </Stack>
    </CustomModal>
  );
}
