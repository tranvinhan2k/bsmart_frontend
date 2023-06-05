import { UseControllerReturn, useForm } from 'react-hook-form';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Button from '../Button';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
// eslint-disable-next-line import/no-cycle
import FormInput from '.';
import Icon from '../Icon';

interface TextInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
  data: any;
}
function FeedbackTypeInput({ controller, placeholder, data }: TextInputProps) {
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { invalid, error },
  } = controller;

  const [updateItem, setUpdateItem] = useState<{
    index: number;
    point: number;
    label: string;
  }>();

  const feedbackQuestionForm = useForm({});

  const handleFeedbackAnswer = (tdata: any) => {
    feedbackQuestionForm.reset();
    controllerOnChange([...value, tdata]);
  };

  const handleDelete = (chooseIndex: number) => {
    const tmpValue = value.filter(
      (_: any, index: number) => index !== chooseIndex
    );
    controllerOnChange(tmpValue);
  };

  console.log(value, typeof value);

  return (
    <Box mb={error ? 2 : 0}>
      <Stack
        sx={{
          background: '#eee',
          height: '400px',
          borderRadius: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {value !== '' && value?.length === 0 ? (
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: FontSize.medium_24,
              fontFamily: FontFamily.regular,
              color: Color.grey,
            }}
          >
            Chưa có câu hỏi nào được nhập vào
          </Typography>
        ) : (
          value !== '' &&
          value?.map((item: any, index: number) => (
            <Stack
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRadius: MetricSize.medium_15,
                width: '98%',
                marginTop: MetricSize.medium_15,
              }}
              key={item.id}
            >
              <Stack
                sx={{
                  background: '#ffffff',
                  flexGrow: 1,
                  padding: MetricSize.medium_15,
                  marginRight: MetricSize.medium_15,
                }}
              >
                <Typography>{`${item?.question?.label}`}</Typography>
              </Stack>
              <Stack sx={{ marginRight: '10px' }}>
                <Button
                  customVariant="horizonForm"
                  onClick={() => handleDelete(index)}
                >
                  <Icon name="delete" size="medium" color="white" />
                </Button>
              </Stack>
            </Stack>
          ))
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
            name="question"
            control={feedbackQuestionForm.control}
            placeholder="Thêm câu hỏi"
            variant="dropdown"
            data={data}
          />
        </Stack>

        <Stack sx={{ width: '200px' }}>
          <Button
            onClick={feedbackQuestionForm.handleSubmit(handleFeedbackAnswer)}
            customVariant="horizonForm"
          >
            Thêm câu hỏi
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
export default FeedbackTypeInput;
