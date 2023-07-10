import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import Button from '~/components/atoms/Button';
import CustomModal from '~/components/atoms/CustomModal';
import FormInput from '~/components/atoms/FormInput';
import MonthSchedule from '~/components/molecules/schedules/MonthSchedule';

import { useDispatchGetAllSlots } from '~/hooks';
import { OptionPayload } from '~/models';
import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';

import { CREATE_CLASS_FIELDS } from '~/form/schema';

const texts = {
  createClassTitle: 'Tạo lớp học mới',
  createClassDescription: 'Thêm lớp học mới cho khóa học hiện tại.',
  generalInfoTitle: 'Thông tin chung',
  priceLabel: 'Giá khóa học',
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
};

interface CreateClassModalProps {
  open: boolean;
  hookForm: UseFormReturn<any, any>;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreateClassModal({
  open,
  hookForm,
  onClose,
  onSubmit,
}: CreateClassModalProps) {
  const { optionSlots } = useDispatchGetAllSlots();
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleOpenCalendar = () => {
    setOpenCalendar(!openCalendar);
  };

  return (
    <CustomModal open={open} onClose={onClose}>
      <Stack sx={{ background: 'white', paddingX: 4, flexDirection: 'row' }}>
        {!openCalendar ? (
          <Stack>
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
              <Stack>
                <FormInput
                  variant="number"
                  name={CREATE_CLASS_FIELDS.price}
                  control={hookForm.control}
                  label={texts.priceLabel}
                />
              </Stack>
              <Stack marginTop={2} />
              <FormInput
                variant="image"
                previewImgHeight={250}
                previewImgWidth={Math.floor((250 * 16) / 9)}
                name={CREATE_CLASS_FIELDS.imageId}
                control={hookForm.control}
                label={texts.imageLabel}
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
              {/* <Button
                disabled
                onClick={handleOpenCalendar}
                customVariant="horizonForm"
              >
                Tạo thời khóa biểu
              </Button> */}
              <Button
                onClick={hookForm.handleSubmit(onSubmit, handleConsoleError)}
                customVariant="horizonForm"
              >
                {texts.createClassButton}
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack sx={{ height: '100vh' }}>
            <MonthSchedule
              data={[
                {
                  id: 0,
                  date: new Date(),
                  slots: [optionSlots[0], optionSlots[1]],
                },
                {
                  id: 1,
                  date: new Date('08/09/2023'),
                  slots: [optionSlots[0], optionSlots[1]],
                },
                {
                  id: 2,
                  date: new Date('08/10/2023'),
                  slots: [optionSlots[0], optionSlots[1]],
                },
                {
                  id: 3,
                  date: new Date('08/11/2023'),
                  slots: [...optionSlots],
                },
                {
                  id: 4,
                  date: new Date('08/12/2023'),
                  slots: [optionSlots[0], optionSlots[1]],
                },
              ]}
            />
          </Stack>
        )}
      </Stack>
    </CustomModal>
  );
}
