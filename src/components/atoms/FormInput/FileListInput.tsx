import { UseControllerReturn, useFieldArray, useForm } from 'react-hook-form';
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
import {
  validationSchemaAnswer,
  validationSchemaFile,
} from '~/form/validation';
import globalStyles from '~/styles';
import { handleConsoleError } from '~/utils/common';

interface FileListInputProps {
  controller: UseControllerReturn<any, string>;
}
function FileListInput({ controller }: FileListInputProps) {
  const {
    field: { value, onChange: controllerOnChange },
  } = controller;

  const resolver = useYupValidationResolver(validationSchemaFile);
  const hookForm = useForm({
    resolver,
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = (data: { file: Blob[] }) => {
    const tmpValue = [...value, data.file[0]];
    controllerOnChange(tmpValue);
    hookForm.reset();
    handleOpen();
  };

  const handleDelete = (paramIndex: number) => {
    const tmpValue = value.filter(
      (_: any, index: number) => index !== paramIndex
    );
    controllerOnChange(tmpValue);
  };

  const handleChangeRightAnswer = (index: number) => {
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

  const {
    fields: attachFields,
    append,
    remove,
  } = useFieldArray({
    name: 'userImages',
    control: hookForm.control,
    rules: {
      required: 'Hãy nhập ít nhất 1 bằng',
    },
  });

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
                  <Typography>{item.name}</Typography>
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
            <Typography textAlign="center" sx={globalStyles.textLowSmallLight}>
              Chưa thêm tệp đính kèm nào.
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
          }}
        >
          <Stack sx={{ flexGrow: 1 }}>
            <FormInput
              control={hookForm.control}
              name="file.0"
              placeholder="Tệp đính kèm"
              variant="file"
            />
          </Stack>
          <Box>
            <Button
              sx={{
                marginTop: 1,
                color: Color.white,
              }}
              variant="contained"
              color="secondary"
              onClick={hookForm.handleSubmit(handleSubmit, handleConsoleError)}
            >
              Thêm tệp đính kèm
            </Button>
          </Box>
        </Stack>
      </Collapse>
    </Stack>
  );
}
export default FileListInput;
