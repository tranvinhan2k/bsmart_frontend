import { GridColDef } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import { formatISODateDateToDisplayDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';

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
const courseCreateRequestColumns: GridColDef[] = [
  {
    field: 'courseCode',
    headerName: 'Mã khóa học',
    minWidth: 50,
    flex: 1,
  },
  {
    field: 'courseName',
    headerName: 'Tên khóa học',
    minWidth: 100,
    flex: 2,
  },
  {
    field: 'price',
    headerName: 'Giá tiền (vnđ)',
    minWidth: 50,
    flex: 1,
    renderCell: (params) => {
      const { price } = params.row;
      const formattedDate = formatMoney(price);
      return formattedDate;
    },
  },
  {
    field: 'startDateExpected',
    headerName: 'Ngày bắt đầu dự kiến',
    minWidth: 100,
    flex: 1,
    renderCell: (params) => {
      const { startDateExpected } = params.row;
      const formattedDate = formatISODateDateToDisplayDate(startDateExpected);
      return formattedDate;
    },
  },
  {
    field: 'endDateExpected',
    headerName: 'Ngày kết thúc dự kiến',
    minWidth: 100,
    flex: 1,
    renderCell: (params) => {
      const { endDateExpected } = params.row;
      const formattedDate = formatISODateDateToDisplayDate(endDateExpected);
      return formattedDate;
    },
  },
];
const attendanceClassColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'slotName',
    headerName: 'Tên slot',
    flex: 1,
    editable: true,
  },
  {
    field: 'date',
    headerName: 'Ngày',
    flex: 5,
    editable: true,
  },
];

const columns = {
  templateColumns,
  feedbackQuestionColumns,
  categoryColumns,
  subjectColumns,
  registerRequestColumns,
  courseCreateRequestColumns,
  attendanceClassColumns,
};

export default columns;
