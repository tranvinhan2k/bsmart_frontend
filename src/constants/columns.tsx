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
const categoryColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'code',
    headerName: 'Mã môn học',
    flex: 1,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Tên Môn học',
    flex: 5,
    editable: true,
  },
];
const subjectColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'code',
    headerName: 'Mã ngôn ngữ lập trình',
    flex: 1,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Tên ngôn ngữ lập trình',
    flex: 5,
    editable: true,
  },
  {
    field: 'categoryId',
    headerName: 'Tên Môn học',
    flex: 1,
    editable: true,
    valueGetter: (params) => {
      return `${params.row.categoryId.label || ''} `;
    },
  },
];

const columns = {
  templateColumns,
  feedbackQuestionColumns,
  categoryColumns,
  subjectColumns,
};

export default columns;
