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
  answerType: QuizQuestionTypeKeys;
  controller: UseControllerReturn<any, string>;
}
function AnswerInput({ answerType, controller }: AnswerInputProps) {
  const {
    field: { value, onChange: controllerOnChange },
  } = controller;

  const [open, setOpen] = useState(false);

  const resolver = useYupValidationResolver(validationSchemaAnswer);
  const addAnswer = useForm<{ answer: string; right: boolean }>({
    defaultValues: {
      answer: '',
      right: false,
    },
    resolver,
  });

  useEffect(() => {
    controllerOnChange([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerType]);

  const handleOpen = () => {
    setOpen(!open);
  };

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
    handleOpen();
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

  return (
    <Stack
      sx={{
        border: '0.5px solid grey',
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
                  <IconButton onClick={() => handleDelete(index)}>
                    <Icon name="delete" size="small_20" color="red" />
                  </IconButton>
                </Stack>
                <Typography>{item.answer}</Typography>
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
            <Typography textAlign="center" sx={globalStyles.textLowSmallLight}>
              Chưa thêm câu trả lời nào.
            </Typography>
          </Stack>
        )}
      </Stack>
      <Box>
        <Button
          startIcon={
            <Icon
              name={!open ? 'add' : 'close'}
              size="small_20"
              color="white"
            />
          }
          variant="contained"
          color={!open ? 'info' : 'error'}
          onClick={handleOpen}
        >
          {!open ? 'Thêm câu trả lời' : 'Hủy'}
        </Button>
      </Box>
      <Collapse in={open}>
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
      </Collapse>
    </Stack>
  );
}
export default AnswerInput;
