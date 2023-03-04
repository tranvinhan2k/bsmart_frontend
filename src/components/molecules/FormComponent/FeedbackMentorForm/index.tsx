import { Divider, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { defaultValueFeedbackMentor } from '~/form/defaultValues';
import { FEEDBACK_MENTOR_FIELDS } from '~/form/schema';
import { validationSchemaFeedbackMentor } from '~/form/validation';
import useYupValidationResolver from '~/hooks/useYupValidationResolver';
import { OptionPayload } from '~/models';

const MentorData: OptionPayload[] = [
  {
    id: 0,
    label: 'Giáo Viên A',
    value: '1',
  },
  {
    id: 1,
    label: 'Giáo Viên B',
    value: '2',
  },
];

const SubjectData: OptionPayload[] = [
  {
    id: 0,
    label: 'Toán',
    value: '1',
  },
  {
    id: 1,
    label: 'Ngữ Văn',
    value: '2',
  },
];
const EnthusiasmLevelData: OptionPayload[] = [
  {
    id: 0,
    label: '0',
    value: '0',
  },
  {
    id: 1,
    label: '1',
    value: '1',
  },
  {
    id: 2,
    label: '2',
    value: '2',
  },
  {
    id: 3,
    label: '3',
    value: '3',
  },
  {
    id: 4,
    label: '4',
    value: '4',
  },
  {
    id: 5,
    label: '5',
    value: '5',
  },
];
const SupportAnswerQuestion: OptionPayload[] = [
  {
    id: 0,
    label: 'Yes',
    value: 'yes',
  },
  {
    id: 1,
    label: 'No',
    value: 'no',
  },
];
const SupportHomeWork: OptionPayload[] = [
  {
    id: 0,
    label: 'Yes',
    value: 'yes',
  },
  {
    id: 1,
    label: 'No',
    value: 'no',
  },
  {
    id: 2,
    label: 'Other',
    value: 'other',
  },
];

export default function FeedbackMentorForm() {
  const resolverFeedback = useYupValidationResolver(
    validationSchemaFeedbackMentor
  );
  const feedbackHookForm = useForm({
    defaultValues: defaultValueFeedbackMentor,
    resolver: resolverFeedback,
  });

  function handleSubmitSuccess(data: any) {
    console.log('data', data);
    // TODO: add api for feedback teacher.
  }
  function handleSubmitError(e: any) {
    console.log('e', e);
    // TODO: add api for feedback teacher.
  }

  return (
    <Stack>
      <form
        onSubmit={feedbackHookForm.handleSubmit(
          handleSubmitSuccess,
          handleSubmitError
        )}
      >
        <FormInput
          variant="dropdown"
          data={MentorData}
          control={feedbackHookForm.control}
          name={FEEDBACK_MENTOR_FIELDS.mentorId}
          placeholder="Chọn giản viên mà bạn muốn đánh giá:"
          label="Chọn giản viên mà bạn muốn đánh giá:"
        />
        <Divider sx={{ marginY: MetricSize.medium_15 }} />

        <FormInput
          variant="dropdown"
          data={SubjectData}
          control={feedbackHookForm.control}
          name={FEEDBACK_MENTOR_FIELDS.subjectId}
          placeholder="Chọn môn học mà bạn muốn đánh giá:"
          label="Chọn môn học mà bạn muốn đánh giá:"
        />
        <Divider sx={{ marginY: MetricSize.medium_15 }} />

        <FormInput
          variant="radioGroup"
          data={EnthusiasmLevelData}
          control={feedbackHookForm.control}
          name={FEEDBACK_MENTOR_FIELDS.enthusiasmLevel}
          label="Bạn cảm thấy mức độ nhiệt tình của giáo viên như thế nào?"
        />
        <Divider sx={{ marginY: MetricSize.medium_15 }} />

        <FormInput
          variant="radioGroup"
          data={SupportAnswerQuestion}
          control={feedbackHookForm.control}
          name={FEEDBACK_MENTOR_FIELDS.supportAnswerQuestion}
          label="Giảng viên có giải đáp thắc mắc kịp thời ngay buổi học hay không?"
        />
        <Divider sx={{ marginY: MetricSize.medium_15 }} />

        <FormInput
          variant="radioGroup"
          data={SupportHomeWork}
          control={feedbackHookForm.control}
          name={FEEDBACK_MENTOR_FIELDS.supportHomeWork}
          label="Giảng viên có thường xuyên hướng dẫn bài tập hay không?"
        />
        <Divider sx={{ marginY: MetricSize.medium_15 }} />
        <FormInput
          variant="multiline"
          control={feedbackHookForm.control}
          name={FEEDBACK_MENTOR_FIELDS.feelingOfTeacher}
          placeholder="Bạn hãy cho chúng tôi biết cảm nhận của bạn khi trãi qua khóa học này."
          label="Bạn hãy cho chúng tôi biết cảm nhận của bạn khi trãi qua khóa học này."
        />
        <Button type="submit" customVariant="form">
          Gửi
        </Button>
      </form>
    </Stack>
  );
}
