import { Button, Collapse, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { handleConsoleError } from '~/utils/common';
import InputGroup from '../FormInput/InputGroup';
import { SearchTextField } from '../textField/SearchTextField';
import Icon from '../Icon';
import { useDispatchGetAllSubjects, useYupValidationResolver } from '~/hooks';
import { validationClassListFilter } from '~/form/validation';

interface Props {
  searchValue: string;
  startDate: string;
  endDate: string;
  subjectId: number[];
  onSearchValue: (searchValue: string) => void;
  onFilter: (data: {
    startDate: string;
    endDate: string;
    subjectId: number[];
  }) => void;
}

export default function SearchFilterClasses({
  searchValue,
  endDate,
  startDate,
  subjectId,
  onSearchValue,
  onFilter,
}: Props) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      startDate,
      endDate,
      subjectId,
    },
  });

  const { optionSubjects } = useDispatchGetAllSubjects();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
        marginTop={1}
      >
        <Stack sx={{ flexGrow: 1 }}>
          <SearchTextField
            value={searchValue}
            onChange={(e) => onSearchValue(e.target.value)}
          />
        </Stack>
        <Stack
          sx={{
            marginLeft: 1,
          }}
        >
          <Button
            onClick={handleOpen}
            sx={{
              height: '38px',
            }}
            variant="contained"
          >
            <Icon name="filter" size="small_20" color="white" />
          </Button>
        </Stack>
      </Stack>
      <Collapse in={open}>
        <Stack
          sx={{
            alignItems: 'flex-start',
            marginY: 1,
          }}
        >
          <InputGroup
            control={control}
            inputList={[
              {
                label: 'Ngày bắt đầu',
                name: 'startDate',
                placeholder: 'Nhập ngày bắt đầu',
                variant: 'date',
              },
              {
                label: 'Ngày kết thúc',
                name: 'endDate',
                placeholder: 'Nhập ngày kết thúc',
                variant: 'date',
              },
              {
                label: 'Danh sách môn học',
                name: 'subjectId',
                placeholder: 'Nhập môn học',
                variant: 'multiSelect',
                data: optionSubjects,
              },
            ]}
          />
          <Button
            sx={{ marginTop: 1 }}
            onClick={handleSubmit(onFilter, handleConsoleError)}
            variant="contained"
          >
            Lọc kết quả tìm kiếm
          </Button>
        </Stack>
      </Collapse>
    </Stack>
  );
}
