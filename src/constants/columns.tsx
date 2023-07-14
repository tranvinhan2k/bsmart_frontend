import { Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { RenderAttendanceStatus } from '~/utils/attendance';
import { getGender, handleDefinedText } from '~/utils/common';
import { CopyableCell } from '~/utils/commonComp';
import { formatISODateDateToDisplayDate } from '~/utils/date';
import { formatPhoneNumberVi } from '~/utils/phone';

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
    renderCell: (params) => {
      const { email } = params.row;
      return (
        <CopyableCell
          rawValue={email}
          formattedValue={handleDefinedText(email)}
        />
      );
    },
  },
  {
    field: 'fullName',
    headerName: 'Họ tên',
    minWidth: 100,
    flex: 1,
    renderCell: (params) => {
      const { fullName } = params.row;
      return <CopyableCell rawValue={fullName} formattedValue={fullName} />;
    },
  },
  {
    field: 'phone',
    headerName: 'SĐT',
    minWidth: 100,
    flex: 1,
    renderCell: (params) => {
      const { phone } = params.row;
      return (
        <CopyableCell
          rawValue={phone}
          formattedValue={formatPhoneNumberVi(phone)}
        />
      );
    },
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    minWidth: 100,
    flex: 1,
    valueFormatter: (params) => getGender(params.value),
  },
  {
    field: 'birthday',
    headerName: 'Ngày sinh',
    minWidth: 100,
    flex: 1,
    valueFormatter: (params) => formatISODateDateToDisplayDate(params.value),
  },
];

const courseCreateRequestColumns: GridColDef[] = [
  {
    field: 'code',
    headerName: 'Mã',
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      const { code } = params.row;
      return <CopyableCell rawValue={code} formattedValue={code} />;
    },
  },
  {
    field: 'name',
    headerName: 'Tên khóa học',
    minWidth: 300,
    flex: 3,
    renderCell: (params) => {
      const { name } = params.row;
      return <CopyableCell rawValue={name} formattedValue={name} />;
    },
  },
  {
    field: 'categoryResponse',
    headerName: 'phân loại',
    minWidth: 100,
    flex: 1,
    valueGetter: (params) => params.value.name,
    renderCell: (params) => {
      return (
        <Chip
          color="default"
          label={`${params.row.categoryResponse.name || ''}`}
          title={`${params.row.categoryResponse.name || ''}`}
        />
      );
    },
  },
  {
    field: 'subjectResponse',
    headerName: 'Môn học',
    minWidth: 100,
    flex: 1,
    valueFormatter: (params) => params.value.name,
    renderCell: (params) => {
      return (
        <Chip
          color="default"
          label={`${params.row.subjectResponse.name || ''}`}
          title={`${params.row.subjectResponse.name || ''}`}
        />
      );
    },
  },
  {
    field: 'dateFirstClassExpectToOpen',
    headerName: 'Bắt đầu sớm nhất',
    minWidth: 200,
    flex: 1,
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
const attendanceStudentColumns: GridColDef[] = [
  {
    field: 'no',
    headerName: 'STT',
    minWidth: 25,
    flex: 0.6,
    sortable: false,
  },
  {
    field: 'date',
    headerName: 'Ngày học',
    minWidth: 100,
    flex: 2,
    sortable: false,
    renderCell: (params) => {
      return (
        <Chip
          color="info"
          size="small"
          label={formatISODateDateToDisplayDate(params.row.date)}
          title={formatISODateDateToDisplayDate(params.row.date)}
        />
      );
    },
  },
  {
    field: 'slot',
    headerName: 'Giờ học',
    minWidth: 100,
    flex: 2,
    sortable: false,
    renderCell: (params) => {
      return (
        <Chip
          color="warning"
          size="small"
          label={`${params.row.slot || ''}`}
          title={`${params.row.slot || ''}`}
        />
      );
    },
  },
  {
    field: 'attendanceStatus',
    headerName: 'Trang thái điểm danh',
    minWidth: 150,
    flex: 2,
    sortable: false,
    renderCell: (params) => {
      return (
        <RenderAttendanceStatus
          input={`${params.row.attendanceStatus || ''}`}
        />
      );
    },
  },
  {
    field: 'mentorComment',
    headerName: 'Giảng viên ghi chú',
    minWidth: 100,
    sortable: false,
    flex: 4,
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
  attendanceStudentColumns,
};

export default columns;
