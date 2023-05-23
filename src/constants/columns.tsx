import { GridColDef } from '@mui/x-data-grid';
import { IconButton, Stack } from '@mui/material';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';

const templateColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'templateName',
    headerName: 'Tên bản mẫu',
    flex: 5,
    editable: true,
  },
  {
    field: 'numberOfQuestion',
    headerName: 'Số lượng câu hỏi',
    width: 150,
    editable: true,
  },
];
const feedbackQuestionColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Tên bản mẫu',
    flex: 5,
    editable: true,
  },
];

const columns = {
  templateColumns,
  feedbackQuestionColumns,
};

export default columns;
