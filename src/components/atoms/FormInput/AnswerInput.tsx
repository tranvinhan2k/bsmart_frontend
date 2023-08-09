import { UseControllerReturn, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  FormHelperText,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { MetricSize, Color } from '~/assets/variables';
// eslint-disable-next-line import/no-cycle
import FormInput from '.';
import Icon from '../Icon';
import { QuizQuestionTypeKeys } from '~/models/variables';
import { useYupValidationResolver } from '~/hooks';
import { validationSchemaAnswer } from '~/form/validation';
import globalStyles from '~/styles';

interface AnswerInputProps {
  answerType?: QuizQuestionTypeKeys;
  controller: UseControllerReturn<any, string>;
}
function AnswerInput({ answerType, controller }: AnswerInputProps) {
  const {
    field: { value, onChange: controllerOnChange },
    fieldState: { invalid, error },
  } = controller;

  const resolver = useYupValidationResolver(validationSchemaAnswer);
  const addAnswer = useForm<{ answer: string; right: boolean }>({
    defaultValues: {
      answer: '',
      right: false,
    },
    resolver,
  });

  useEffect(() => {
    controllerOnChange(
      value
        ? value?.map((item: any) => ({
            ...item,
            right: false,
          }))
        : []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerType]);

  const handleSubmit = (data: { answer: string; right: boolean }) => {
    const tmpValue = [
      ...value,
      {
        answer: data.answer,
        right: false,
      },
    ];
    controllerOnChange(tmpValue);
    addAnswer.reset();
  };

  const handleDelete = (paramIndex: number) => {
    const tmpValue = value.filter(
      (_: any, index: number) => index !== paramIndex
    );
    controllerOnChange(tmpValue);
  };

  const handleChangeRightAnswer = (index: number) => {
    if (value[index].right === false && answerType === 'SINGLE') {
      const tmpValue = value.map((subItem: any, subIndex: number) => {
        if (index === subIndex) {
          return {
            answer: subItem.answer,
            right: true,
          };
        }
        return {
          answer: subItem.answer,
          right: false,
        };
      });
      controllerOnChange(tmpValue);
      return;
    }
    const tmpValue = value.map((subItem: any, subIndex: number) => {
      if (index === subIndex) {
        return {
          answer: subItem.answer,
          right: !subItem.right,
        };
      }
      return subItem;
    });
    controllerOnChange(tmpValue);
  };

  console.log('answertype', answerType);

  return (
    <Stack>
      <Stack
        sx={{
          border: `1px solid ${invalid ? Color.red : Color.grey}`,
          borderRadius: MetricSize.small_5,
          padding: 1,
          background: Color.white,
        }}
      >
        <Stack>
          {value && value?.length > 0 ? (
            value?.map((item: any, index: number) => {
              return (
                <Stack
                  sx={{
                    marginBottom: 1,
                    background: Color.white4,
                    borderRadius: MetricSize.small_5,
                    padding: 1,
                  }}
                  key={index}
                >
                  <Stack
                    sx={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Stack
                      sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      {answerType && (
                        <Tooltip title="Chọn câu trả lời đúng">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={item.right}
                                onChange={() => handleChangeRightAnswer(index)}
                              />
                            }
                            label=""
                          />
                        </Tooltip>
                      )}
                      <Typography>{item.answer}</Typography>
                    </Stack>
                    <IconButton onClick={() => handleDelete(index)}>
                      <Icon name="delete" size="small_20" color="red" />
                    </IconButton>
                  </Stack>
                </Stack>
              );
            })
          ) : (
            <Stack
              padding={2}
              sx={{
                background: Color.white4,
                marginBottom: 1,
              }}
            >
              <Typography
                textAlign="center"
                sx={globalStyles.textLowSmallLight}
              >
                Chưa thêm câu trả lời nào.
              </Typography>
            </Stack>
          )}
        </Stack>

        <Stack
          sx={{
            marginTop: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Stack sx={{ flexGrow: 1 }}>
            <FormInput
              control={addAnswer.control}
              name="answer"
              placeholder="Tên câu hỏi"
            />
          </Stack>
          <Button
            sx={{
              marginLeft: 1,
              color: Color.white,
              height: '35px',
            }}
            variant="contained"
            color="secondary"
            onClick={addAnswer.handleSubmit(handleSubmit)}
          >
            Thêm câu trả lời
          </Button>
        </Stack>
      </Stack>
      {invalid && (
        <FormHelperText error>{(error as any)?.message}</FormHelperText>
      )}
    </Stack>
  );
}
export default AnswerInput;
