import { UseControllerReturn, useFieldArray, useForm } from 'react-hook-form';
import {
  Box,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { GridRowIdGetter, GridValidRowModel } from '@mui/x-data-grid';

// eslint-disable-next-line import/no-cycle
import FormInput from '.';

import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '../Button';
import { handleConsoleError } from '~/utils/common';
import CRUDTable from '~/components/molecules/CRUDTable';
import CustomModal from '../CustomModal';
import globalStyles from '~/styles';

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
  } = controller;

  const [addOpen, setAddOpen] = useState(false);
  const [row, setRow] = useState<any>();
  const [searchValue, setSearchValue] = useState('');
  const filterValue =
    value === ''
      ? []
      : value.filter((item: any) =>
          item.question.toLowerCase().includes(searchValue.toLowerCase())
        );
  const handleAddOpen = () => {
    setAddOpen(!addOpen);
  };

  const handleSearchValue = (text: { searchValue: string }) => {
    setSearchValue(`${text.searchValue}`);
  };

  const addQuestion = useForm();

  const questionTypeWatch = addQuestion.watch('questionType');
  const handleSubmit = (data: any) => {
    const tmpValue = [...value, data].map((item, index) => ({
      id: index,
      ...item,
    }));

    controllerOnChange(tmpValue);
    addQuestion.reset();
    handleAddOpen();
  };

  const handleDeleteRow = () => {
    if (row) {
      controllerOnChange(value.filter((item: any) => item.id !== row.id));
    }
  };

  return (
    <Stack
      padding={2}
      sx={{
        marginTop: 1,
        background: 'white',
        boxShadow: 1,
        borderRadius: MetricSize.small_5,
      }}
    >
      <Stack
        sx={{
          marginY: 2,
        }}
      >
        <CRUDTable
          title="Danh sách câu hỏi"
          onAdd={handleAddOpen}
          addItemButtonLabel="Thêm câu hõi"
          onSearch={handleSearchValue}
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
      <CustomModal open={addOpen} onClose={handleAddOpen}>
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
    </Stack>
  );
}
export default QuizInput;
