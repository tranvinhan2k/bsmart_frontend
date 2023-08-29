import { Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomModal from '~/components/atoms/CustomModal';
import CRUDTable from '~/components/molecules/CRUDTable';
import DoQuizReviewList from '~/components/molecules/DoQuizReviewList';
import { comparisonData, quizStatusData } from '~/constants';
import {
  MemberDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { useGetIdFromUrl } from '~/hooks';
import { useMentorListQuiz } from '~/hooks/quiz/useMentorListQuiz';
import { useBoolean } from '~/hooks/useBoolean';
import { QuizReportTeacherPayload } from '~/models/type';
import { reviewQuiz } from '~/redux/user/slice';
import globalStyles from '~/styles';
import { formatISODateStringToDisplayDateTime } from '~/utils/date';

export default function MentorClassPointsPage({ quizId }: { quizId: number }) {
  const classId = useGetIdFromUrl('id');
  const [row, setRow] = useState<QuizReportTeacherPayload>();
  const [searchValue, setSearchValue] = useState('');

  const { data, error, isLoading } = useMentorListQuiz(quizId, classId);

  const filterData = data?.items.filter((item) =>
    item.name.toLowerCase().includes(searchValue?.toLowerCase())
  );

  const columns: GridColDef<QuizReportTeacherPayload>[] = [
    {
      field: 'name',
      headerName: 'Tên học sinh',
      flex: 1,
    },
    {
      field: 'submitAt',
      flex: 6,
      headerName: 'Thời gian nộp bài',
      renderCell: (params) => {
        const formatCell = formatISODateStringToDisplayDateTime(
          params.row?.submitAt
        );
        return formatCell;
      },
    },

    {
      field: 'correctPoint',
      headerName: 'Điểm',
      flex: 1,
      renderCell: (params) => {
        return `${params.row.correctNumber}`;
      },
    },
  ];

  const handleSearch = (params: any) => {
    setSearchValue(params?.searchValue || '');
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onReview = () => {
    dispatch(
      reviewQuiz({
        quizId: row?.id || 0,
        quizTime: 0,
        quizName: row?.name || '',
      })
    );
    navigate(
      `/${NavigationLink.dashboard}/${
        MemberDashboardNavigationActionLink.review
      }/${row?.id || 0}`
    );
  };

  return (
    <Stack>
      <Typography sx={globalStyles.textSmallLabel}>Thông kê điểm số</Typography>
      <Stack>
        <CRUDTable
          setSelectedRow={setRow}
          isLoading={isLoading}
          error={error}
          columns={columns}
          rows={filterData || []}
          searchPlaceholder="Nhập tên học sinh bạn muốn tìm kiếm"
          onSearch={handleSearch}
          menuItemList={[
            {
              icon: 'viewDetail',
              onCLick: onReview,
              title: 'Xem bài làm',
            },
          ]}
          searchFilterFormInputList={[
            {
              name: 'status',
              data: quizStatusData,
              placeholder: 'Nhập trạng thái của bài kiểm tra',
              variant: 'dropdown',
            },
            {
              name: 'comparison',
              data: comparisonData,
              placeholder: 'Nhập phép so sánh',
              variant: 'dropdown',
            },
            {
              name: 'point',
              variant: 'number',
              placeholder: 'Điểm số của học sinh',
            },
            {
              name: 'startDate',
              variant: 'date',
              placeholder: 'Nhập ngày bắt đầu',
            },
            {
              name: 'endDate',
              variant: 'date',
              placeholder: 'Nhập ngày kết thúc',
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}
