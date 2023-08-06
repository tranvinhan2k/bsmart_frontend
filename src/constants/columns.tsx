import { Chip, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { GridColDef } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import { CopyableCell, IsVerifiedCell } from '~/utils/commonComp';
import { getGender, handleDefinedText } from '~/utils/common';
import {
  formatISODateDateToDisplayDate,
  formatISODateStringToDisplayDate,
} from '~/utils/date';
import { formatMoney } from '~/utils/money';
import { formatPhoneNumberVi } from '~/utils/phone';
import { mockLevelData } from './data';

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

const managedRegisterRequestTmpColumns: GridColDef[] = [
  {
    field: 'email',
    headerName: 'Mail',
    minWidth: 300,
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
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      const { fullName } = params.row;
      return <CopyableCell rawValue={fullName} formattedValue={fullName} />;
    },
  },
  {
    field: 'phone',
    headerName: 'SĐT',
    minWidth: 200,
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
    field: 'birthday',
    headerName: 'Ngày sinh',
    minWidth: 150,
    flex: 1,
    valueFormatter: (params) => formatISODateDateToDisplayDate(params.value),
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    minWidth: 100,
    flex: 1,
    valueFormatter: (params) => getGender(params.value),
  },
];

const manageMentorProfileUpdateRequestColumns: GridColDef[] = [
  {
    field: 'email',
    headerName: 'Mail',
    minWidth: 300,
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
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      const { fullName } = params.row;
      return <CopyableCell rawValue={fullName} formattedValue={fullName} />;
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
    type: 'number',
    headerAlign: 'left',
    headerName: 'Lần gửi',
    minWidth: 80,
    flex: 1,
  },
  {
    field: 'totalDegreeRequest',
    type: 'number',
    headerAlign: 'left',
    headerName: 'Số bằng cấp',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'totalSkillRequest',
    type: 'number',
    headerAlign: 'left',
    headerName: 'Số chuyên môn',
    minWidth: 120,
    flex: 1,
  },
];
const managedCourseBasedColumns: GridColDef[] = [
  {
    field: 'code',
    headerName: 'Mã khóa học',
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
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      const { name } = params.row.mentor;
      return <CopyableCell rawValue={name} formattedValue={name} />;
    },
  },
  {
    field: 'level',
    headerName: 'Trình độ',
    minWidth: 100,
    flex: 1,
    valueFormatter: (params) =>
      mockLevelData.find((item) => item.value === params.value)?.label,
  },
  {
    field: 'categoryResponse',
    headerName: 'phân loại',
    minWidth: 130,
    flex: 1,
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
    minWidth: 130,
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
];
const managedCourseColumns = managedCourseBasedColumns.concat(
  {
    field: 'timeSendRequest',
    headerName: 'Ngày phê duyệt',
    minWidth: 120,
    flex: 1,
    valueFormatter: (params) => formatISODateStringToDisplayDate(params.value),
  },
  {
    field: 'totalClass',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Số lớp',
    minWidth: 70,
    flex: 1,
  }
);
const managedCourseCreateRequestColumns = managedCourseBasedColumns.concat(
  {
    field: 'timeSendRequest',
    headerName: 'Ngày gửi',
    type: 'dateTime',
    headerAlign: 'left',
    minWidth: 150,
    flex: 1,
    valueFormatter: (params) => formatISODateStringToDisplayDate(params.value),
  },
  {
    field: 'totalClass',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Số lớp',
    minWidth: 70,
    flex: 1,
  },
  {
    field: 'count',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Lần gửi',
    minWidth: 70,
    flex: 1,
  },
  {
    field: 'approved',
    headerAlign: 'left',
    type: 'boolean',
    headerName: 'Từng duyệt ?',
    minWidth: 100,
    flex: 1,
    renderCell: (params) => {
      return params.value ? (
        <CheckIcon
          titleAccess="Chưa từng duyệt"
          style={{
            color: red[500],
          }}
        />
      ) : (
        <CloseIcon
          titleAccess="Đã từng duyệt"
          style={{
            color: green[500],
          }}
        />
      );
    },
  }
);

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
            color: params.row.isTookAttendance ? Color.green : Color.red,
          }}
        >
          {params.row.isTookAttendance ? 'Đã điểm danh' : ' Chưa điểm danh'}
        </Typography>
      );
    },
    editable: true,
  },
];

const managedUserBasedColumns: GridColDef[] = [
  {
    field: 'email',
    headerName: 'Mail',
    minWidth: 200,
    flex: 1,
    renderCell: (params) => (
      <CopyableCell rawValue={params.value} formattedValue={params.value} />
    ),
  },
  {
    field: 'fullName',
    headerName: 'Họ tên',
    minWidth: 200,
    flex: 1,
    renderCell: (params) => (
      <CopyableCell rawValue={params.value} formattedValue={params.value} />
    ),
  },
  {
    field: 'phone',
    headerName: 'SĐT',
    minWidth: 150,
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
];
const managedUserMemberColumns = managedUserBasedColumns.concat({
  field: 'finishedClassCount',
  headerAlign: 'left',
  type: 'number',
  headerName: 'Đã học',
  flex: 1,
  minWidth: 70,
  sortable: false,
  valueGetter: (params) => params.row.finishedClassCount,
});
const managedUserMentorColumns = managedUserBasedColumns.concat(
  {
    field: 'isVerified',
    headerName: 'Trạng thái',
    minWidth: 100,
    flex: 1,
    sortable: false,
    renderCell: (params) => <IsVerifiedCell isVerified={params.value} />,
  },
  {
    field: 'numberOfClass',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Số khóa học',
    minWidth: 100,
    flex: 1,
    sortable: false,
    valueGetter: (params) => params.row.teachInformation.numberOfCourse,
  },
  {
    field: 'teachInformation',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Số lớp học',
    minWidth: 100,
    flex: 1,
    sortable: false,
    valueGetter: (params) => params.row.teachInformation.numberOfClass,
  },
  {
    field: 'numberOfFeedBack',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Đánh giá',
    minWidth: 80,
    flex: 1,
    sortable: false,
    valueGetter: (params) => params.row.teachInformation.numberOfFeedBack,
  },
  {
    field: 'scoreFeedback',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Lượt đanh giá',
    minWidth: 120,
    flex: 1,
    sortable: false,
    valueGetter: (params) => params.row.teachInformation.scoreFeedback,
  },
  {
    field: 'numberOfMember',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Số học sinh',
    minWidth: 100,
    flex: 1,
    sortable: false,
    valueGetter: (params) => params.row.teachInformation.numberOfMember,
  }
);
const managedUserRegisterRequestColumns = managedUserBasedColumns.concat(
  {
    field: 'count',
    headerName: 'Lần gửi',
    headerAlign: 'left',
    type: 'number',
    minWidth: 80,
    flex: 1,
  },
  {
    field: 'timeSendRequest',
    headerName: 'Ngày gửi',
    minWidth: 150,
    flex: 1,
    valueFormatter: (params) => formatISODateDateToDisplayDate(params.value),
  }
);

const courseClassListColumns: GridColDef[] = [
  {
    field: 'code',
    headerName: 'Mã lớp',
    minWidth: 90,
    flex: 1,
  },
  {
    field: 'minStudent',
    headerAlign: 'left',
    type: 'number',
    headerName: 'HS tối thiểu',
    minWidth: 90,
    flex: 1,
  },
  {
    field: 'maxStudent',
    headerAlign: 'left',
    type: 'number',
    headerName: 'HS tối đa',
    minWidth: 90,
    flex: 1,
  },
  {
    field: 'numberOfSlot',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Tổng buổi',
    minWidth: 90,
    flex: 1,
  },
  {
    field: 'price',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Giá tiền',
    minWidth: 90,
    flex: 1,
    valueFormatter: (params) => formatMoney(params.value),
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
    field: 'courseCode',
    headerName: 'Mã khóa học',
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      const { courseCode } = params.row;
      return <CopyableCell rawValue={courseCode} formattedValue={courseCode} />;
    },
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
    field: 'price',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Giá tiền',
    minWidth: 120,
    flex: 1,
    valueFormatter: (params) => formatMoney(params.value),
  },
  {
    field: 'numberOfSlot',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Số buổi',
    minWidth: 80,
    flex: 1,
  },
  {
    field: 'numberOfStudent',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Học sinh hiện tại',
    minWidth: 130,
    flex: 1,
  },
  {
    field: 'minStudent',
    headerName: 'Học sinh tối thiểu',
    headerAlign: 'left',
    type: 'number',
    minWidth: 130,
    flex: 1,
  },
  {
    field: 'maxStudent',
    headerName: 'Học sinh tối đa',
    headerAlign: 'left',
    type: 'number',
    minWidth: 120,
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
    field: 'courseCode',
    headerName: 'Mã khóa học',
    minWidth: 150,
    flex: 1,
    renderCell: (params) => {
      const { courseCode } = params.row;
      return <CopyableCell rawValue={courseCode} formattedValue={courseCode} />;
    },
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
    headerAlign: 'left',
    type: 'number',
    headerName: 'Số buổi',
    minWidth: 130,
    flex: 1,
  },
  {
    field: 'price',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Giá tiền',
    minWidth: 120,
    flex: 1,
    valueFormatter: (params) => formatMoney(params.value),
  },
  {
    field: 'numberOfStudent',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Học sinh hiện tại',
    minWidth: 130,
    flex: 1,
  },
  {
    field: 'minStudent',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Học sinh tối thiểu',
    minWidth: 130,
    flex: 1,
  },
  {
    field: 'maxStudent',
    headerAlign: 'left',
    type: 'number',
    headerName: 'Học sinh tối đa',
    minWidth: 130,
    flex: 1,
  },
];

const columns = {
  feedbackQuestionColumns,
  categoryColumns,
  courseClassListColumns,
  subjectColumns,
  attendanceClassColumns,
  managedClassColumns,
  managedClassNotStartColumns,
  managedCourseColumns,
  managedCourseCreateRequestColumns,
  managedRegisterRequestTmpColumns,
  managedUserRegisterRequestColumns,
  manageMentorProfileUpdateRequestColumns,
  managedUserMemberColumns,
  managedUserMentorColumns,
};

export default columns;
