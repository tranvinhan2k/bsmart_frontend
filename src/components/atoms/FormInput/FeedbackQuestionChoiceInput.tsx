import { UseControllerReturn, useForm } from 'react-hook-form';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import globalStyles, { SX_TEXT_INPUT_FORM } from '~/styles';
import Button from '../Button';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
// eslint-disable-next-line import/no-cycle
import FormInput from '.';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaFeedbackQuestionChoice } from '~/form/validation';
import { FEEDBACK_QUESTION_FIELDS } from '~/form/schema';
import toast from '~/utils/toast';
import Icon from '../Icon';
import CustomModal from '../CustomModal';
import { changeArrayToHashmap, isHashMap } from '~/utils/common';

interface TextInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function FeedbackQuestionChoiceInput({
  controller,
  placeholder,
}: TextInputProps) {
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { invalid, error },
  } = controller;

  const [updateItem, setUpdateItem] = useState<{
    index: number;
    point: number;
    label: string;
  }>();

  const resolver = useYupValidationResolver(
    validationSchemaFeedbackQuestionChoice
  );
  const feedbackQuestionForm = useForm({
    defaultValues: {
      point: 0,
      label: '',
    },
    resolver,
  });

  const handleFeedbackAnswer = (data: any) => {
    if (value?.length !== 5) {
      feedbackQuestionForm.reset();
      controllerOnChange([...value, data]);
    }
    if (value.length === 5) {
      toast.notifyErrorToast('Chỉ được thêm tối đa 5 câu trả lời.');
    }
  };
  const handleUpdateFeedbackAnswer = (data: any) => {
    const tmpValue = value.map((item: any, index: number) => {
      if (index === updateItem?.index) {
        return data;
      }
      return item;
    });
    controllerOnChange(tmpValue);
    setUpdateItem(undefined);
    feedbackQuestionForm.reset();
  };

  const handleDelete = (chooseIndex: number) => {
    const tmpValue = value.filter(
      (_: any, index: number) => index !== chooseIndex
    );
    controllerOnChange(tmpValue);
  };

  useEffect(() => {
    if (isHashMap(value)) {
      controllerOnChange(changeArrayToHashmap(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box mb={error ? 2 : 0}>
      <CustomModal
        open={Boolean(updateItem)}
        onClose={() => setUpdateItem(undefined)}
      >
        <Stack padding={2}>
          <Typography sx={globalStyles.textSubTitle}>
            Cập nhật câu trả lời
          </Typography>
          <Stack sx={{ marginTop: '5px', flexGrow: 1 }}>
            <FormInput
              name={FEEDBACK_QUESTION_FIELDS.point}
              control={feedbackQuestionForm.control}
              placeholder="Thêm số điểm"
            />
          </Stack>
          <Stack sx={{ marginTop: '5px', flexGrow: 1 }}>
            <FormInput
              name={FEEDBACK_QUESTION_FIELDS.label}
              control={feedbackQuestionForm.control}
              placeholder="Cập nhật câu trả lời"
            />
          </Stack>

          <Stack sx={{ marginTop: '5px' }}>
            <Button
              onClick={feedbackQuestionForm.handleSubmit(
                handleUpdateFeedbackAnswer
              )}
              customVariant="form"
            >
              Cập nhật câu trả lời
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
      <Stack
        sx={{
          background: '#eee',
          height: '400px',
          borderRadius: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!isHashMap(value) && value?.length === 0 ? (
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: FontSize.medium_24,
              fontFamily: FontFamily.regular,
              color: Color.grey,
            }}
          >
            Chưa có câu trả lời nào được nhập vào (Chỉ được nhập tối đa 5 câu
            trả lời)
          </Typography>
        ) : (
          !isHashMap(value) &&
          value?.map(
            (item: { point: number; label: string }, index: number) => (
              <Stack
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  borderRadius: MetricSize.medium_15,
                  width: '98%',
                  marginTop: MetricSize.medium_15,
                }}
                key={item.point}
              >
                <Stack
                  sx={{
                    background: '#ffffff',
                    marginRight: 1,
                    width: '50px',
                    padding: MetricSize.medium_15,
                    alignItems: 'center',
                  }}
                >
                  <Typography>{item.point}</Typography>
                </Stack>
                <Stack
                  sx={{
                    background: '#ffffff',
                    flexGrow: 1,
                    padding: MetricSize.medium_15,
                    marginRight: MetricSize.medium_15,
                  }}
                >
                  <Typography>{item.label}</Typography>
                </Stack>
                <Stack sx={{ marginRight: '10px' }}>
                  <Button
                    customVariant="horizonForm"
                    onClick={() => handleDelete(index)}
                  >
                    <Icon name="delete" size="medium" color="white" />
                  </Button>
                </Stack>
                <Button
                  customVariant="horizonForm"
                  onClick={() => {
                    setUpdateItem({ index, ...item });
                    feedbackQuestionForm.setValue(
                      FEEDBACK_QUESTION_FIELDS.point,
                      item.point
                    );
                    feedbackQuestionForm.setValue(
                      FEEDBACK_QUESTION_FIELDS.label,
                      item.label
                    );
                  }}
                >
                  <Icon name="edit" size="medium" color="white" />
                </Button>
              </Stack>
            )
          )
        )}
      </Stack>
      <Stack
        sx={{
          marginTop: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack sx={{ marginRight: '5px', flexGrow: 1 }}>
          <FormInput
            name={FEEDBACK_QUESTION_FIELDS.point}
            control={feedbackQuestionForm.control}
            placeholder="Thêm số điểm"
          />
        </Stack>
        <Stack sx={{ marginRight: '5px', flexGrow: 1 }}>
          <FormInput
            name={FEEDBACK_QUESTION_FIELDS.label}
            control={feedbackQuestionForm.control}
            placeholder="Thêm câu trả lời"
          />
        </Stack>

        <Stack sx={{ width: '200px' }}>
          <Button
            onClick={feedbackQuestionForm.handleSubmit(handleFeedbackAnswer)}
            customVariant="horizonForm"
          >
            Thêm câu trả lời
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
export default FeedbackQuestionChoiceInput;
