import {
  Stack,
  Typography,
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Color, FontSize, FontFamily } from '~/assets/variables';
import CustomModal from '~/components/atoms/CustomModal';
import FormInput from '~/components/atoms/FormInput';
import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';
import CourseAlert from './CourseAlert';
import { CourseStatusKeys } from '~/models/variables';
import { CourseContext } from '~/HOCs/context/CourseContext';
import { useGetIdFromUrl, useSubmitForReviewCourse } from '~/hooks';
import toast from '~/utils/toast';
import { formatStringToNumber } from '~/utils/number';
import { OptionPayload } from '~/models';

export default function SidebarApproval() {
  const { course, percent, classes, content, refetchCourse } =
    useContext(CourseContext);

  const id = useGetIdFromUrl('id');
  const [open, setOpen] = useState(false);

  const data: OptionPayload[] | undefined = classes
    ?.filter((item) => item.status === 'REQUESTING')
    .map((item, index) => ({
      id: index,
      label: `Lớp ${item.code}`,
      value: `${item.id}`,
    }));

  const { handleSubmitForReview, handleTryCatch } = useSubmitForReviewCourse();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSubmitCourse = async (paramData: { classes: string[] }) => {
    const isEmptyContent = content.find(
      (item) => item.subActivities.length === 0
    );
    if (!isEmptyContent) {
      if (percent.allowSendingApproval) {
        if (paramData && paramData?.classes.length > 0) {
          await handleTryCatch(async () =>
            handleSubmitForReview({
              id,
              params: paramData.classes.map((item) =>
                formatStringToNumber(item)
              ),
            })
          );
          handleOpen();
          await refetchCourse();
        } else {
          toast.notifyErrorToast('Chưa chọn lớp để phê duyệt');
        }
      } else {
        toast.notifyErrorToast('Chưa đủ điều kiện để phê duyệt');
      }
    } else {
      toast.notifyErrorToast(
        'Nội dung khóa học không được có học phần trống !'
      );
    }
  };

  const hookForm = useForm<{ classes: string[] }>({
    defaultValues: {
      classes: useMemo(() => classes?.map((item) => `${item.id}`), [classes]),
    },
  });

  useEffect(() => {
    if (classes) {
      hookForm.reset({
        classes: classes?.map((item) => `${item.id}`),
      });
    }
  }, [classes, hookForm]);

  return (
    <Stack margin={2}>
      <CourseAlert status={course.status || 'ALL'} />
      {(course?.status === 'REQUESTING' ||
        course?.status === 'EDITREQUEST' ||
        (data && data?.length > 0)) && (
        <Stack sx={globalStyles.viewCenter}>
          <Typography
            textAlign="center"
            sx={{
              width: '170px',
              color: Color.black,
              fontSize: FontSize.small_14,
              fontFamily: FontFamily.bold,
            }}
          >
            Phần trăm hoàn thành các bước phê duyệt
          </Typography>
          <Stack
            sx={{
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2,
            }}
          >
            <CircularProgress
              color="secondary"
              variant="determinate"
              value={percent.percentComplete}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >{`${Math.round(percent.percentComplete || 0)}%`}</Typography>
            </Box>
          </Stack>
          <Button
            sx={{
              marginTop: 1,
              color: Color.white,
            }}
            variant="contained"
            color="secondary"
            disabled={Math.round(percent.percentComplete || 0) < 100}
            onClick={handleOpen}
          >
            Gửi yêu cầu phê duyệt
          </Button>

          <CustomModal open={open} onClose={handleOpen}>
            <Stack sx={{ padding: 1, minWidth: '60vw' }}>
              <Typography
                sx={{
                  ...globalStyles.textSubTitle,
                  textAlign: 'center',
                }}
              >
                Chọn lớp học để phê duyệt
              </Typography>
              <Stack
                sx={{
                  paddingY: 2,
                }}
              >
                <FormInput
                  control={hookForm.control}
                  name="classes"
                  data={data}
                  variant="multiSelect"
                />
              </Stack>
              <Stack>
                <Button
                  onClick={hookForm.handleSubmit(
                    handleSubmitCourse,
                    handleConsoleError
                  )}
                  variant="contained"
                >
                  Gửi yêu cầu phê duyệt
                </Button>
              </Stack>
            </Stack>
          </CustomModal>
        </Stack>
      )}
    </Stack>
  );
}
