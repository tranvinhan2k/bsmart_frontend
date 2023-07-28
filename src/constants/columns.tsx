import { Chip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import { CopyableCell, IsVerifiedCell } from '~/utils/commonComp';
import { getGender, handleDefinedText } from '~/utils/common';
import { RenderAttendanceStatus } from '~/utils/attendance';
import {
  formatISODateDateToDisplayDate,
  formatISODateStringToDisplayDate,
} from '~/utils/date';
import { formatMoney } from '~/utils/money';
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

const managedRegisterRequestColumns: GridColDef[] = [
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
  {
    field: 'timeSendRequest',
    headerName: 'Ngày gửi',
    minWidth: 100,
    flex: 1,
    valueFormatter: (params) => formatISODateDateToDisplayDate(params.value),
  },
  {
    field: 'count',
    headerName: 'Lần gửi',
    minWidth: 100,
    flex: 1,
  },
];

const managedCourseCreateRequestColumns: GridColDef[] = [
  {
    field: 'code',
    headerName: 'Mã',
    minWidth: 130,
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
    field: 'mentor',
    headerName: 'Giáo viên',
    minWidth: 100,
    flex: 2,
    renderCell: (params) => {
      const { name } = params.row.mentor;
      return <CopyableCell rawValue={name} formattedValue={name} />;
    },
  },
  {
    field: 'categoryResponse',
    headerName: 'Phân loại',
    minWidth: 100,
    flex: 1.5,
    valueGetter: (params) => params.value.name,
    renderCell: (params) => {
      return (
        <Chip
          color="default"
          size="small"
          label={`${params.row.categoryResponse.name || ''}`}
          title={`${params.row.categoryResponse.name || ''}`}
        />
      );
    },
  },
  {
    field: 'subjectResponse',
    headerName: 'Môn học',
    minWidth: 120,
    flex: 1,
    valueFormatter: (params) => params.value.name,
    renderCell: (params) => {
      return (
        <Chip
          color="default"
          size="small"
          label={`${params.row.subjectResponse.name || ''}`}
          title={`${params.row.subjectResponse.name || ''}`}
        />
      );
    },
  },
  {
    field: 'requestDate',
    headerName: 'Ngày gửi',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'noOfSubmit',
    headerName: 'Lần gửi',
    minWidth: 90,
    flex: 1,
  },
];
const attendanceClassColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'slotName',
    headerName: 'Tên buổi học',
    flex: 1,
  },
  {
    field: 'time',
    headerName: 'Thời gian',
    flex: 1,
  },
  {
    field: 'date',
    headerName: 'Ngày',
    flex: 5,
    renderCell: (params) => {
      return formatISODateDateToDisplayDate(params?.row?.date);
    },
  },
  {
    field: 'isPresent',
    headerName: 'Trạng thái',
    flex: 1,
    renderCell: (params) => {
      return (
        <Typography
          sx={{
            fontSize: FontSize.small_14,
            fontFamily: FontFamily.medium,
            color: params.row.isPresent ? Color.green : Color.red,
          }}
        >
          {params.row.isPresent ? 'Đã điểm danh' : ' Chưa điểm danh'}
        </Typography>
      );
    },
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

const managedUserColumns: GridColDef[] = [
  {
    field: 'email',
    headerName: 'Mail',
    minWidth: 150,
    flex: 1.5,
    renderCell: (params) => (
      <CopyableCell rawValue={params.value} formattedValue={params.value} />
    ),
  },
  {
    field: 'fullName',
    headerName: 'Họ tên',
    minWidth: 150,
    flex: 1.5,
    renderCell: (params) => (
      <CopyableCell rawValue={params.value} formattedValue={params.value} />
    ),
  },
  {
    field: 'phone',
    headerName: 'SĐT',
    minWidth: 150,
    flex: 1,
    renderCell: (params) => (
      <CopyableCell
        rawValue={params.value}
        formattedValue={formatPhoneNumberVi(params.value)}
      />
    ),
  },
  {
    field: 'birthday',
    headerName: 'Ngày sinh',
    minWidth: 130,
    flex: 1,
    valueFormatter: (params) => formatISODateStringToDisplayDate(params.value),
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    minWidth: 100,
    flex: 1,
    sortable: false,
    valueFormatter: (params) => getGender(params.value),
  },
  {
    field: 'isVerified',
    headerName: 'Trạng thái',
    minWidth: 100,
    flex: 1,
    sortable: false,
    renderCell: (params) => <IsVerifiedCell isVerified={params.value} />,
  },
];
const managedUserMemberColumns = managedUserColumns.concat({
  field: 'attended',
  headerName: 'Đã học',
  flex: 1,
  minWidth: 100,
  sortable: false,
});
const managedUserMentorColumns = managedUserColumns.concat(
  {
    field: 'taught',
    headerName: 'Đã dạy',
    minWidth: 90,
    flex: 1,
    sortable: false,
  },
  {
    field: 'rating',
    headerName: 'Đánh giá',
    minWidth: 100,
    flex: 1,
    sortable: false,
  }
);
const courseClassListColumns: GridColDef[] = [
  {
    field: 'code',
    headerName: 'Mã',
    minWidth: 90,
    flex: 2,
  },
  {
    field: 'minStudent',
    headerName: 'HS tối thiểu',
    minWidth: 90,
    flex: 1,
  },
  {
    field: 'maxStudent',
    headerName: 'HS tối đa',
    minWidth: 90,
    flex: 1,
  },
  {
    field: 'numberOfSlot',
    headerName: 'Tổng buổi',
    minWidth: 90,
    flex: 1,
  },
  {
    field: 'price',
    headerName: 'Giá tiền',
    minWidth: 120,
    flex: 1,
    valueFormatter: (params) => formatMoney(params.value),
  },
];

const managedCourseColumns: GridColDef[] = [
  {
    field: 'code',
    headerName: 'Mã',
    minWidth: 130,
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
    field: 'mentor',
    headerName: 'Giáo viên',
    minWidth: 100,
    flex: 2,
    renderCell: (params) => {
      const { name } = params.row.mentor;
      return <CopyableCell rawValue={name} formattedValue={name} />;
    },
  },
  {
    field: 'categoryResponse',
    headerName: 'phân loại',
    minWidth: 100,
    flex: 1.5,
    valueGetter: (params) => params.value.name,
    renderCell: (params) => {
      return (
        <Chip
          color="default"
          size="small"
          label={`${params.row.categoryResponse.name || ''}`}
          title={`${params.row.categoryResponse.name || ''}`}
        />
      );
    },
  },
  {
    field: 'subjectResponse',
    headerName: 'Môn học',
    minWidth: 120,
    flex: 1,
    valueFormatter: (params) => params.value.name,
    renderCell: (params) => {
      return (
        <Chip
          color="default"
          size="small"
          label={`${params.row.subjectResponse.name || ''}`}
          title={`${params.row.subjectResponse.name || ''}`}
        />
      );
    },
  },
  {
    field: 'earliestClass',
    headerName: 'Bắt đầu từ',
    minWidth: 100,
    flex: 1,
  },
];

const managedClassNotStartColumns: GridColDef[] = [
  {
    field: 'code',
    headerName: 'Mã lớp',
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      const { code } = params.row;
      return <CopyableCell rawValue={code} formattedValue={code} />;
    },
  },
  {
    field: 'codeCourse',
    headerName: 'Mã khóa học',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'startDate',
    headerName: 'Ngày bắt đầu',
    minWidth: 150,
    flex: 1,
    valueFormatter: (params) => formatISODateDateToDisplayDate(params.value),
  },
  {
    field: 'endDate',
    headerName: 'Ngày kết thúc (Dự kiến)',
    minWidth: 170,
    flex: 1,
    valueFormatter: (params) => formatISODateDateToDisplayDate(params.value),
  },
  {
    field: 'price',
    headerName: 'Giá tiền',
    minWidth: 170,
    flex: 1,
    valueFormatter: (params) => formatMoney(params.value),
  },
  {
    field: 'numberOfSlot',
    headerName: 'Số buổi',
    minWidth: 130,
    flex: 1,
  },
  {
    field: 'numberOfStudent',
    headerName: 'Học sinh hiện tại',
    minWidth: 130,
    flex: 1,
  },
  {
    field: 'minStudent',
    headerName: 'Học sinh tối thiểu',
    minWidth: 130,
    flex: 1,
  },
  {
    field: 'maxStudent',
    headerName: 'Học sinh tối đa',
    minWidth: 130,
    flex: 1,
  },
];
const managedClassColumns: GridColDef[] = [
  {
    field: 'code',
    headerName: 'Mã lớp',
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      const { code } = params.row;
      return <CopyableCell rawValue={code} formattedValue={code} />;
    },
  },
  {
    field: 'codeCourse',
    headerName: 'Mã khóa học',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'startDate',
    headerName: 'Ngày bắt đầu (Dự kiến)',
    minWidth: 170,
    flex: 1,
    valueFormatter: (params) => formatISODateDateToDisplayDate(params.value),
  },
  {
    field: 'endDate',
    headerName: 'Ngày kết thúc (Dự kiến)',
    minWidth: 170,
    flex: 1,
    valueFormatter: (params) => formatISODateDateToDisplayDate(params.value),
  },
  {
    field: 'startDateActual',
    headerName: 'Ngày bắt đầu (Thực tế)',
    minWidth: 170,
    flex: 1,
    valueFormatter: (params) => formatISODateDateToDisplayDate(params.value),
  },
  {
    field: 'endDateActual',
    headerName: 'Ngày kết thúc (Thực tế)',
    minWidth: 170,
    flex: 1,
    valueFormatter: (params) => formatISODateDateToDisplayDate(params.value),
  },
  {
    field: 'numberOfSlot',
    headerName: 'Số buổi',
    minWidth: 130,
    flex: 1,
  },
  {
    field: 'price',
    headerName: 'Giá tiền',
    minWidth: 130,
    flex: 1,
    valueFormatter: (params) => formatMoney(params.value),
  },
  {
    field: 'numberOfStudent',
    headerName: 'Học sinh hiện tại',
    minWidth: 130,
    flex: 1,
  },
  {
    field: 'minStudent',
    headerName: 'Học sinh tối thiểu',
    minWidth: 130,
    flex: 1,
  },
  {
    field: 'maxStudent',
    headerName: 'Học sinh tối đa',
    minWidth: 130,
    flex: 1,
  },
];

const columns = {
  templateColumns,
  feedbackQuestionColumns,
  categoryColumns,
  courseClassListColumns,
  subjectColumns,
  attendanceClassColumns,
  attendanceStudentColumns,
  managedClassColumns,
  managedClassNotStartColumns,
  managedCourseColumns,
  managedCourseCreateRequestColumns,
  managedRegisterRequestColumns,
  managedUserMemberColumns,
  managedUserMentorColumns,
};

export default columns;
