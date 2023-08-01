import { UseControllerReturn, useForm } from 'react-hook-form';
import {
  Box,
  Stack,
  Typography,
  FormHelperText,
  Collapse,
} from '@mui/material';
import { useState } from 'react';

// eslint-disable-next-line import/no-cycle
import FormInput from '.';

import { Color, MetricSize } from '~/assets/variables';
import Button from '../Button';
import { handleConsoleError } from '~/utils/common';
import CRUDTable from '~/components/molecules/CRUDTable';
import CustomModal from '../CustomModal';
import globalStyles from '~/styles';
import { useYupValidationResolver } from '~/hooks';
import { useBoolean } from '~/hooks/useBoolean';
import {
  validationClassContentQuiz,
  validationFeedbackQuestionInput,
} from '~/form/validation';
import { FeedbackTypeOptionList } from '~/constants';

interface FeedbackQuestionInputProps {
  disabled?: boolean;
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}

export interface FeedbackQuestionPayload {
  question: string;
  answers: {
    answers: string;
  }[];
}

function FeedbackQuestionInput({
  disabled = false,
  controller,
  placeholder,
}: FeedbackQuestionInputProps) {
  const {
    field: { value, onChange: controllerOnChange },
    fieldState: { invalid, error },
  } = controller;

  const [row, setRow] = useState<any>();
  const [searchValue, setSearchValue] = useState('');
  const filterValue =
    value === ''
      ? []
      : value.filter((item: any) =>
          item.question?.toLowerCase().includes(searchValue?.toLowerCase())
        );
  const { value: openQuestion, toggle: toggleQuestion } = useBoolean(false);

  const handleSearchValue = (text: { searchValue: string }) => {
    setSearchValue(`${text.searchValue}`);
  };
  const resolver = useYupValidationResolver(validationFeedbackQuestionInput);
  const addQuestion = useForm({
    resolver,
  });

  const handleSubmit = (data: any) => {
    const tmpValue: FeedbackQuestionPayload[] = [...value, data].map(
      (item, index) => ({
        id: index,
        question: item.question,
        answers: item.answers.map((subItem: any) => ({
          answer: subItem.answer,
        })),
      })
    );
    addQuestion.reset();
    controllerOnChange(tmpValue);
  };

  const handleDeleteRow = () => {
    if (row) {
      controllerOnChange(
        value.filter((item: any) => item.question !== row.question)
      );
    }
  };

  return (
    <Stack>
      <Stack
        padding={2}
        sx={{
          marginTop: 1,
          background: 'white',
          border: `1px solid ${invalid ? Color.red : Color.transparent}`,
          boxShadow: 1,
          borderRadius: MetricSize.small_5,
        }}
      >
        <CustomModal open={openQuestion} onClose={toggleQuestion}>
          <Stack
            padding={2}
            sx={{
              width: '60vw',
            }}
          >
            <Typography textAlign="center" sx={globalStyles.textSubTitle}>
              Thêm câu hỏi
            </Typography>
            <FormInput
              control={addQuestion.control}
              name="question"
              placeholder="Tên cẩu hỏi"
              label="Tên câu hỏi"
            />
            <Stack marginTop={1} />
            <FormInput
              control={addQuestion.control}
              name="answers"
              variant="answerPicker"
              label="Danh sách câu trả lời"
            />

            <Box>
              <Button
                sx={{
                  marginTop: 2,
                  color: Color.white,
                }}
                color="secondary"
                variant="contained"
                onClick={addQuestion.handleSubmit(
                  handleSubmit,
                  handleConsoleError
                )}
              >
                Thêm câu hỏi
              </Button>
            </Box>
          </Stack>
        </CustomModal>
        <Stack
          sx={{
            marginY: 2,
          }}
        >
          <CRUDTable
            title="Danh sách câu hỏi"
            onSearch={handleSearchValue}
            onAdd={toggleQuestion}
            addItemButtonLabel="Thêm câu hỏi"
            columns={[
              {
                field: 'question',
                headerName: 'Tên câu hỏi',
                flex: 5,
              },
              {
                field: 'answers',
                headerName: 'Số lượng câu trả lời',
                flex: 2,
                renderCell(params) {
                  return params.row?.answers?.length || 0;
                },
              },
            ]}
            menuItemList={[
              {
                icon: 'delete',
                onCLick: handleDeleteRow,
                title: 'Xóa câu hỏi',
              },
            ]}
            setSelectedRow={setRow}
            searchPlaceholder="Tìm kiếm câu trả lời"
            rows={filterValue || []}
          />
        </Stack>
      </Stack>
      {invalid && (
        <FormHelperText error>{`${(error as any)?.message}`}</FormHelperText>
      )}
    </Stack>
  );
}
export default FeedbackQuestionInput;
