import { Box, Stack, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import { useState } from 'react';
import Button from '~/components/atoms/Button';
import CustomModal from '~/components/atoms/CustomModal';
import FormInput from '~/components/atoms/FormInput';
import MonthSchedule, {
  MonthTimeSlotPayload,
} from '~/components/molecules/schedules/MonthSchedule';

import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';

import { CREATE_CLASS_FIELDS } from '~/form/schema';
import { Color } from '~/assets/variables';

const texts = {
  createClassTitle: 'Tạo lớp học mới',
  createClassDescription: 'Thêm lớp học mới cho khóa học hiện tại.',
  generalInfoTitle: 'Thông tin chung',
  priceLabel: 'Giá khóa học (VND)',
  courseTypeLabel: 'Hình thức khóa học',
  imageLabel: 'Hình ảnh',
  minStudentLabel: 'Số học sinh tối thiểu',
  maxStudentLabel: 'Số học sinh tối đa',
  levelInfoTitle: 'Trình độ',
  classInfoTitle: 'Thông tin giờ học',
  startDateLabel: 'Ngày mở lớp dự kiến',
  endDateLabel: 'Ngày kết thúc dự kiến',
  numberOfSlotLabel: 'Số buổi học',
  timetableLabel: 'Thời khóa biểu',
  createClassButton: 'Tạo lớp học',
  Button: 'Xem chi tiết lịch dạy của cả một kỉ học',
};

interface CreateClassModalProps {
  open: boolean;
  hookForm: UseFormReturn<any, any>;
  onClose: () => void;
  onSubmit: (data: any) => void;
  onBack: () => void;
  onReset: () => void;
  timetable: MonthTimeSlotPayload[] | undefined;
  onViewSchedule: (data: any) => void;
}

export default function CreateClassModal({
  open,
  timetable,
  hookForm,
  onClose,
  onSubmit,
  onBack,
  onReset,
  onViewSchedule,
}: CreateClassModalProps) {
  const [openSchedule, setOpenSchedule] = useState(false);

  const handleOpenSchedule = () => {
    setOpenSchedule(!openSchedule);
  };

  const handleTriggerSchedule = async (data: any) => {
    await onViewSchedule(data);

    if (!timetable) handleOpenSchedule();
  };

  return (
    <CustomModal open={open} onClose={onClose}>
      <Stack sx={{ background: 'white', paddingX: 4, flexDirection: 'row' }}>
        {!openSchedule ? (
          <Stack sx={{ minWidth: { xs: '100%', md: '60vw' } }}>
            <Typography sx={globalStyles.textSubTitle}>
              {texts.createClassTitle}
            </Typography>
            <Typography sx={globalStyles.textLowSmallLight}>
              {texts.createClassDescription}
            </Typography>
            <Stack paddingY={2}>
              <Stack>
                <Typography sx={globalStyles.textSmallLabel}>
                  {texts.generalInfoTitle}
                </Typography>
              </Stack>
              <FormInput
                variant="image"
                previewImgHeight={250}
                previewImgWidth={Math.floor((250 * 16) / 9)}
                name={CREATE_CLASS_FIELDS.imageId}
                control={hookForm.control}
                label={texts.imageLabel}
              />
              <Stack marginTop={2} />
              <Stack>
                <FormInput
                  variant="price"
                  name={CREATE_CLASS_FIELDS.price}
                  control={hookForm.control}
                  label={texts.priceLabel}
                />
              </Stack>

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
                  label={texts.minStudentLabel}
                />
                <FormInput
                  variant="number"
                  name={CREATE_CLASS_FIELDS.maxStudent}
                  control={hookForm.control}
                  label={texts.maxStudentLabel}
                />
              </Stack>
              <Stack marginTop={2} />
              <Typography sx={globalStyles.textSmallLabel}>
                {texts.classInfoTitle}
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
                  label={texts.startDateLabel}
                />
                <FormInput
                  variant="date"
                  name={CREATE_CLASS_FIELDS.endDateExpected}
                  control={hookForm.control}
                  label={texts.endDateLabel}
                />
              </Stack>
              <Stack marginTop={2} />
              <FormInput
                name={CREATE_CLASS_FIELDS.numberOfSlot}
                variant="number"
                control={hookForm.control}
                label={texts.numberOfSlotLabel}
              />
              <Stack marginTop={2} />
              <FormInput
                name={CREATE_CLASS_FIELDS.timeInWeekRequests}
                variant="timetable"
                control={hookForm.control}
                label={texts.timetableLabel}
              />
              <Stack marginTop={2} />
              <Button
                sx={{
                  marginTop: 1,
                }}
                onClick={hookForm.handleSubmit(onSubmit, handleConsoleError)}
                variant="contained"
              >
                {texts.createClassButton}
              </Button>
              {/* <Button
                sx={{ marginTop: 1 }}
                variant="contained"
                color="error"
                onClick={onReset}
              >
                Hủy tạo lớp
              </Button> */}
            </Stack>
          </Stack>
        ) : (
          <Stack>
            <MonthSchedule data={timetable || []} />
            <Stack
              marginTop={1}
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Button
                sx={{ marginLeft: 1 }}
                variant="contained"
                onClick={handleOpenSchedule}
                color="success"
              >
                Trở lại
              </Button>
              <Button
                sx={{ marginLeft: 1 }}
                variant="contained"
                color="error"
                onClick={onReset}
              >
                Hủy tạo lớp
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </CustomModal>
  );
}
