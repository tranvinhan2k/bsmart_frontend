import { GridColDef } from '@mui/x-data-grid';
import { formatISODateDateToDisplayDate } from '~/utils/date';

const templateColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'templateName',
    headerName: 'Tên bản mẫu',
    flex: 5,
    editable: true,
  },
  {
    field: 'questions',
    headerName: 'Số lượng câu hỏi',
    width: 150,
    editable: true,
    valueGetter: (params) => {
      return `${params?.row?.questions?.length || 'Chưa thêm câu hỏi'} `;
    },
  },
];
const feedbackQuestionColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'question',
    headerName: 'Tên bản mẫu',
    flex: 4,
  },
  {
    field: 'questionType',
    headerName: 'Loại câu hỏi',
    flex: 1,
    valueGetter: (params) => {
      return `${params?.row?.questionType?.label} `;
    },
  },
  {
    field: 'possibleAnswer',
    headerName: 'Số lượng câu trả lời',
    flex: 2,
    valueGetter: (params) => {
      return `${
        Object.keys(params?.row?.possibleAnswer || {})?.length ||
        'Không có câu trả lời mặc định'
      } `;
    },
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
const registerRequestColumns: GridColDef[] = [
  {
    field: 'email',
    headerName: 'Mail',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'fullName',
    headerName: 'Họ tên',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'phone',
    headerName: 'SĐT',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'birthday',
    headerName: 'Ngày sinh',
    minWidth: 100,
    flex: 1,
    renderCell: (params) => {
      const { birthday } = params.row;
      const formattedDate = formatISODateDateToDisplayDate(birthday);
      return formattedDate;
    },
  },
];

const columns = {
  templateColumns,
  feedbackQuestionColumns,
  categoryColumns,
  subjectColumns,
  registerRequestColumns,
};

export default columns;
