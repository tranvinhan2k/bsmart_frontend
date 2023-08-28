import { UseControllerReturn, useForm } from 'react-hook-form';
import { Stack, FormHelperText, Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

// eslint-disable-next-line import/no-cycle

import { Color, MetricSize } from '~/assets/variables';
import CRUDTable from '~/components/molecules/CRUDTable';
import { useBoolean } from '~/hooks/useBoolean';
import AddQuizQuestions from '~/components/molecules/AddQuizQuestions';
import CustomModal from '../CustomModal';
import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';
// eslint-disable-next-line import/no-cycle
import FormInput from '.';
import { useYupValidationResolver } from '~/hooks';
import { validationQuizInput } from '~/form/validation';

export interface QuizQuestionPayload {
  id: number;
  question: string;
  answers: {
    answer: string;
    right: boolean;
  }[];
}

interface QuizInputProps {
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
export default function QuizInput({ controller, placeholder }: QuizInputProps) {
  const {
    field: { value, onChange: controllerOnChange },
    fieldState: { invalid, error },
  } = controller;

  const [row, setRow] = useState<any>();
  const [searchValue, setSearchValue] = useState('');
  const resolver = useYupValidationResolver(validationQuizInput);
  const updateQuizHookForm = useForm({
    resolver,
  });
  const questionTypeWatch = updateQuizHookForm.watch('questionType');

  const filterValue =
    value === ''
      ? []
      : value.filter((item: any) =>
          item.question.toLowerCase().includes(searchValue.toLowerCase())
        );
  const { value: openQuestion, toggle: toggleQuestion } = useBoolean(false);
  const { value: openQuestionDetail, toggle: toggleQuestionDetail } =
    useBoolean(false);

  const handleSearchValue = (text: { searchValue: string }) => {
    setSearchValue(`${text.searchValue}`);
  };

  const handleDeleteRow = () => {
    if (row) {
      controllerOnChange(value.filter((item: any) => item.id !== row.id));
    }
  };

  const handleViewDetail = () => {
    updateQuizHookForm.reset(row);
    toggleQuestionDetail();
  };

  const handleUpdateQuizQuestion = (data: any) => {
    const tmpValue = value.map((item: any) => {
      if (item.id === row.id) {
        return {
          id: item.id,
          ...data,
        };
      }
      return item;
    });
    updateQuizHookForm.reset();

    controllerOnChange(tmpValue);
    toggleQuestionDetail();
  };

  return (
    <Stack>
      <Stack
        padding={2}
        sx={{
          marginTop: 1,
          background: 'white',
          border: `1px solid ${invalid ? Color.red : '#ddd'}`,
          borderRadius: MetricSize.small_5,
        }}
      >
        <AddQuizQuestions
          open={openQuestion}
          onClose={toggleQuestion}
          onChange={controllerOnChange}
          questionList={value}
        />
        <CustomModal open={openQuestionDetail} onClose={toggleQuestionDetail}>
          <Stack
            padding={2}
            sx={{
              width: '60vw',
            }}
          >
            <Typography textAlign="center" sx={globalStyles.textSubTitle}>
              Cập nhật câu hỏi
            </Typography>
            <FormInput
              control={updateQuizHookForm.control}
              name="question"
              placeholder="Tên câu hỏi"
              label="Tên câu hỏi"
            />
            <Stack sx={{ paddingY: 2 }}>
              <FormInput
                label="Loại câu hỏi"
                control={updateQuizHookForm.control}
                variant="radioGroup"
                name="questionType"
                placeholder="Nhập loại câu hỏi"
                data={[
                  {
                    id: 0,
                    label: 'Câu hỏi một lựa chọn',
                    value: 'SINGLE',
                  },
                  {
                    id: 1,
                    label: 'Câu hỏi nhiều lựa chọn',
                    value: 'MULTIPLE',
                  },
                ]}
              />
            </Stack>
            <FormInput
              control={updateQuizHookForm.control}
              name="answers"
              variant="answerPicker"
              answerType={questionTypeWatch}
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
                onClick={updateQuizHookForm.handleSubmit(
                  handleUpdateQuizQuestion,
                  handleConsoleError
                )}
              >
                Cập nhật câu hỏi
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
                minWidth: 300,
              },
              {
                field: 'questionType',
                headerName: 'Loại câu hỏi',
                flex: 2,
                minWidth: 100,
              },
              {
                field: 'answers',
                headerName: 'Số lượng câu trả lời',
                flex: 2,
                minWidth: 100,

                renderCell(params) {
                  return params.row?.answers?.length || 0;
                },
              },
            ]}
            menuItemList={[
              {
                icon: 'viewDetail',
                onCLick: handleViewDetail,
                title: 'Xem chi tiết',
              },
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
