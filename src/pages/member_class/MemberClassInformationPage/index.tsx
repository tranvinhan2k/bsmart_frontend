import { useContext } from 'react';
import { Alert, Rating, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import TextTitle from '~/components/atoms/texts/TextTitle';
import ClassInformationList from '~/components/molecules/ClassInformationList';
import { ClassContext } from '~/HOCs/context/ClassContext';
import {
  useDispatchGetAllSubjects,
  useMutationSendFeedback,
  useQueryMemberFeedback,
  useTryCatch,
  useYupValidationResolver,
} from '~/hooks';
import globalStyles from '~/styles';
import InputGroup, { InputData } from '~/components/atoms/FormInput/InputGroup';
import Button from '~/components/atoms/Button';
import { LoadingWrapper } from '~/HOCs';
import { OptionFeedbackData } from '~/constants';
import {
  validationClassContentAssignment,
  validationRating,
} from '~/form/validation';
import { handleConsoleError } from '~/utils/common';
import { useBoolean } from '~/hooks/useBoolean';

export interface FeedbackMemberQuestionPayload {
  id: number;
  question: string;
}

export interface SendFeedbackPayload {
  ratingNumber: number;
  description: string;
  feedbackValueData: {
    id: number;
    answer: string;
  }[];
}

export default function MemberClassInformationPage() {
  const { detailClass } = useContext(ClassContext);

  const { value, toggle } = useBoolean(false);

  const isDidFeedback = value;

  const isTimeToFeedback =
    !!detailClass?.progressValue &&
    detailClass?.progressValue > 70 &&
    !isDidFeedback;

  const { data, error, isLoading } = useQueryMemberFeedback(
    2,
    isTimeToFeedback
  );

  const { mutateAsync } = useMutationSendFeedback();
  const { handleTryCatch } = useTryCatch('gửi đánh giá');

  const { subjects } = useDispatchGetAllSubjects();
  const subject = subjects.find((item) => item.id === detailClass?.id || 0);

  const resolver = useYupValidationResolver(validationRating);
  const { control, handleSubmit } = useForm({
    resolver,
  });

  const defaultRatingForm: InputData[] = [
    {
      label: 'Đánh giá giáo viên',
      name: 'ratingPoint',
      placeholder: 'Nhập nhận xét về giáo viên',
      variant: 'rating',
    },
    {
      label: 'Nhận xét và giáo viên',
      name: 'description',
      placeholder: 'Nhập nhận xét về giáo viên',
      variant: 'multiline',
    },
  ];

  const templateRatingForm: InputData[] =
    data?.map((item, index) => ({
      label: item.question,
      name: `feedback.${index}`,
      placeholder: '',
      variant: 'radioGroup',
      data: OptionFeedbackData,
    })) || [];

  const inputList: InputData[] = !data
    ? defaultRatingForm
    : [...defaultRatingForm, ...templateRatingForm];
  const onSubmit = async (params: {
    ratingPoint: number;
    description: string;
    feedback: string[];
  }) => {
    if (data) {
      const paramsData: SendFeedbackPayload = {
        description: params.description,
        ratingNumber: params.ratingPoint,
        feedbackValueData: data?.map((item, index) => ({
          id: item.id,
          answer: params.feedback[index],
        })),
      };

      await handleTryCatch(() =>
        mutateAsync({
          id: detailClass?.id,
          params: paramsData,
        })
      );

      toggle();
    }
  };
  return (
    <Stack>
      <TextTitle title="Thông tin lớp học" />
      {isTimeToFeedback && (
        <LoadingWrapper error={error} isLoading={isLoading}>
          <Stack sx={globalStyles.viewRoundedWhiteBody}>
            <Alert severity="warning">Vui lòng đánh giá cho lớp học này.</Alert>
            <Stack marginTop={1}>
              <Typography sx={globalStyles.textSmallLabel}>Nhận xét</Typography>
              <InputGroup inputList={inputList} control={control} />
              <Button
                onClick={handleSubmit(onSubmit, handleConsoleError)}
                sx={{ marginTop: 1 }}
                variant="contained"
              >
                Gửi đánh giá về hệ thống
              </Button>
            </Stack>
          </Stack>
        </LoadingWrapper>
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
