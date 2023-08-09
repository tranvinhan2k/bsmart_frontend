import { Rating, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import CustomModal from '~/components/atoms/CustomModal';
import TextList, { TextListPayload } from '~/components/atoms/texts/TextList';
import CRUDTable from '../CRUDTable';
import { MentorFeedbackListPayload } from '~/pages/mentor_class/MentorClassFeedbacksPage';
import { useBoolean } from '~/hooks/useBoolean';

type Props = {
  data: MentorFeedbackListPayload[];
  error: unknown;
  isLoading: boolean;
};

export default function FeedbackTable({ data, error, isLoading }: Props) {
  const { value: open, toggle } = useBoolean(false);
  const [selectRow, setSelectRow] = useState<MentorFeedbackListPayload>();
  const [searchText, setSearchValue] = useState('');

  const rows = data?.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = ({ searchValue }: { searchValue: string }) => {
    setSearchValue(searchValue);
  };

  const formTextFeedbacks: TextListPayload[] =
    selectRow?.feedbackAnswers?.map((item) => ({
      name: item.question,
      value: item.answer,
      type: 'text',
    })) || [];

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Tên học sinh',
    },

    {
      field: 'report',
      flex: 5,
      headerName: 'Đánh giá từ học sinh',
    },
    {
      field: 'point',
      flex: 1,
      headerName: 'Điểm đánh giá',
      renderCell: (params) => {
        return (
          <Rating
            size="small"
            name="half-rating-read"
            value={params.row.point}
            precision={0.5}
            readOnly
          />
        );
      },
    },
  ];
  return (
    <Stack>
      <CRUDTable
        error={error}
        isLoading={isLoading}
        columns={columns}
        rows={rows || []}
        setSelectedRow={setSelectRow}
        searchPlaceholder="Nhập tên học sinh cần tìm kiếm"
        onSearch={handleSearch}
        menuItemList={[
          {
            title: 'Xem chi tiết',
            icon: 'search',
            onCLick: toggle,
          },
        ]}
      />
      <CustomModal open={open} onClose={toggle}>
        <Stack
          sx={{
            width: { xs: '100%', md: '50vw' },
          }}
          padding={2}
        >
          <TextList
            items={[
              {
                name: 'Tên học sinh',
                value: selectRow?.name || '',
                type: 'text',
              },
              {
                name: 'Đánh giá',
                value: <Rating value={selectRow?.point || 0} readOnly />,
                type: 'custom',
              },
              {
                name: 'Nhận xét',
                value: selectRow?.report || '',
                type: 'text',
              },
              ...formTextFeedbacks,
            ]}
          />
        </Stack>
      </CustomModal>
    </Stack>
  );
}
