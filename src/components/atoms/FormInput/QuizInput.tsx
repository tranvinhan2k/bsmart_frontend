import { UseControllerReturn, useForm } from 'react-hook-form';
import { Box, Stack, Typography, FormHelperText } from '@mui/material';
import { useState } from 'react';

// eslint-disable-next-line import/no-cycle
import FormInput from '.';

import { Color, MetricSize } from '~/assets/variables';
import Button from '../Button';
import { handleConsoleError } from '~/utils/common';
import CRUDTable from '~/components/molecules/CRUDTable';
import CustomModal from '../CustomModal';
import globalStyles from '~/styles';
import {
  useGetAllQuizQuestion,
  useGetBanksQuizQuestions,
  useTryCatch,
  useYupValidationResolver,
} from '~/hooks';
import { validationQuizInput, validationSchemaFile } from '~/form/validation';
import { useBoolean } from '~/hooks/useBoolean';
import { QuizQuestionTypeKeys } from '~/models/variables';
import { useReadFile } from '~/hooks/quizQuestion/useReadFile';
import CustomTab from '../CustomTab';
import Icon from '../Icon';
import toast from '~/utils/toast';
import AddQuizQuestions from '~/components/molecules/AddQuizQuestions';

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
  const filterValue =
    value === ''
      ? []
      : value.filter((item: any) =>
          item.question.toLowerCase().includes(searchValue.toLowerCase())
        );
  const { value: openQuestion, toggle: toggleQuestion } = useBoolean(false);

  const handleSearchValue = (text: { searchValue: string }) => {
    setSearchValue(`${text.searchValue}`);
  };

  const handleDeleteRow = () => {
    if (row) {
      controllerOnChange(value.filter((item: any) => item.id !== row.id));
    }
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
