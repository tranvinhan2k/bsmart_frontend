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
import { validationQuizInput } from '~/form/validation';
import { useBoolean } from '~/hooks/useBoolean';

interface QuizInputProps {
  disabled?: boolean;
  controller: UseControllerReturn<any, string>;
  placeholder: string;
}
function QuizInput({
  disabled = false,
  controller,
  placeholder,
}: QuizInputProps) {
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
  const resolver = useYupValidationResolver(validationQuizInput);
  const addQuestion = useForm({
    resolver,
  });

  const questionTypeWatch = addQuestion.watch('questionType');

  const handleSubmit = (data: any) => {
    const tmpValue = [...value, data].map((item, index) => ({
      id: index,
      ...item,
    }));
    addQuestion.reset();
    controllerOnChange(tmpValue);
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
            <Stack sx={{ paddingY: 2 }}>
              <FormInput
                label="Loại câu hỏi"
                control={addQuestion.control}
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
              control={addQuestion.control}
              name="answers"
              variant="answerPicker"
              label="Danh sách câu trả lời"
              answerType={questionTypeWatch}
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
                field: 'questionType',
                headerName: 'Loại câu hỏi',
                flex: 1,
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
export default QuizInput;
