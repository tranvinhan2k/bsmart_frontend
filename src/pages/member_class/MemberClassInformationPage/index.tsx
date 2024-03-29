import { useContext, useEffect } from 'react';
import { Alert, Rating, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import TextTitle from '~/components/atoms/texts/TextTitle';
import ClassInformationList from '~/components/molecules/ClassInformationList';
import { ClassContext } from '~/HOCs/context/ClassContext';
import {
  useDispatchGetAllSubjects,
  useGetIdFromUrl,
  useMutationSendFeedback,
  useQueryMemberFeedback,
  useTryCatch,
  useYupValidationResolver,
} from '~/hooks';
import globalStyles from '~/styles';
import InputGroup, { InputData } from '~/components/atoms/FormInput/InputGroup';
import Button from '~/components/atoms/Button';
import { LoadingWrapper } from '~/HOCs';
import { validationRating } from '~/form/validation';
import { handleConsoleError } from '~/utils/common';
import { useBoolean } from '~/hooks/useBoolean';
import { formatStringToNumber } from '~/utils/number';
import { useGetStudentFeedback } from '~/hooks/useGetStudentFeedback';
import CustomModal from '~/components/atoms/CustomModal';

export interface FeedbackMemberQuestionPayload {
  id: number;
  question: string;
}

export interface SendFeedbackPayload {
  courseRate: number;
  mentorRate: number;
  comment: string;
  submittedAnswers: {
    questionId: number;
    answerId: number;
  }[];
}

export default function MemberClassInformationPage() {
  const id = useGetIdFromUrl('id');
  const { detailClass } = useContext(ClassContext);

  const { value, toggle } = useBoolean(false);

  const { data: feedbackData, refetch } = useGetStudentFeedback(id);

  const isDidFeedback = !!feedbackData;

  const isTimeToFeedback =
    !!detailClass?.progressValue &&
    detailClass?.progressValue > 70 &&
    !isDidFeedback;

  const { mutateAsync } = useMutationSendFeedback();
  const { handleTryCatch } = useTryCatch('gửi đánh giá');

  const { subjects } = useDispatchGetAllSubjects();
  const subject = subjects?.find((item) => item.id === detailClass?.id || 0);

  const resolver = useYupValidationResolver(validationRating);
  const { control, handleSubmit, reset } = useForm({
    resolver,
    defaultValues: {
      ratingPoint: 0,
      description: '',
    },
  });

  useEffect(() => {
    reset(feedbackData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbackData]);

  const defaultRatingForm: InputData[] = [
    {
      label: 'Đánh giá khóa học',
      name: 'courseRate',
      placeholder: 'Nhập nhận xét về khóa học',
      variant: 'rating',
    },
    {
      label: 'Đánh giá giáo viên',
      name: 'ratingPoint',
      placeholder: 'Nhập nhận xét về giáo viên',
      variant: 'rating',
    },
    {
      label: 'Nhận xét về giáo viên',
      name: 'description',
      placeholder: 'Nhập nhận xét về giáo viên',
      variant: 'multiline',
    },
  ];

  const data = detailClass?.feedback?.questions;

  const templateRatingForm: InputData[] =
    detailClass?.feedback?.questions?.map((item, index) => {
      return {
        label: item.question,
        name: `feedback_${item.id}`,
        placeholder: '',
        variant: 'radioGroup',
        data: item?.answers?.map((subItem, subIndex) => ({
          id: subItem.id,
          label: subItem.answer,
          value: `${subItem.id}`,
        })),
      };
    }) || [];

  const inputList: InputData[] = !data
    ? defaultRatingForm
    : [...defaultRatingForm, ...templateRatingForm];
  const onSubmit = async (params: any) => {
    if (data) {
      const paramsData: SendFeedbackPayload = {
        comment: params.description,
        courseRate: params.courseRate,
        mentorRate: params.ratingPoint,
        submittedAnswers: data?.map((item, index) => ({
          questionId: item.id,
          answerId: formatStringToNumber(params[`feedback_${item.id}`]),
        })),
      };

      await handleTryCatch(() =>
        mutateAsync({
          id: detailClass?.id,
          params: paramsData,
        })
      );
      await refetch();
      toggle();
    }
  };
  return (
    <Stack>
      <TextTitle title="Thông tin lớp học" />
      {isTimeToFeedback && (
        <Stack sx={globalStyles.viewRoundedWhiteBody}>
          <Alert severity="warning">Vui lòng đánh giá cho lớp học này.</Alert>
          <Button
            sx={{ marginTop: 1 }}
            onClick={toggle}
            variant="contained"
            color="info"
          >
            {isDidFeedback ? 'Xem thông tin đã đánh giá' : 'Đánh giá giáo viên'}
          </Button>
          <CustomModal title="Đánh giá khóa học" open={value} onClose={toggle}>
            <Stack marginTop={1}>
              <Typography sx={globalStyles.textSmallLabel}>Nhận xét</Typography>
              <InputGroup inputList={inputList} control={control} />
              <Button
                disabled={isDidFeedback}
                onClick={handleSubmit(onSubmit, handleConsoleError)}
                sx={{ marginTop: 1 }}
                variant="contained"
              >
                Gửi đánh giá về hệ thống
              </Button>
            </Stack>
          </CustomModal>
        </Stack>
      )}
      <Stack marginTop={1} sx={globalStyles.viewRoundedWhiteBody}>
        <ClassInformationList
          code={detailClass?.code || ''}
          endDate={detailClass?.endDate || ''}
          imageAlt={detailClass?.imageAlt || ''}
          imageUrl={detailClass?.imageUrl || ''}
          name={detailClass?.name || ''}
          numberOfSlot={detailClass?.numberOfSlot || 0}
          numberOfStudent={detailClass?.numberOfStudent || 0}
          price={detailClass?.price || 0}
          startDate={detailClass?.startDate || ''}
          status={detailClass?.status || 'ALL'}
          subjectName={subject?.name || ''}
          timetable={detailClass?.timeTablesRequest || []}
        />
      </Stack>
    </Stack>
  );
}
