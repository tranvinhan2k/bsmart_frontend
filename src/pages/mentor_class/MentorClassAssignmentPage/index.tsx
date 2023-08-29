import { Box, Button, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import CRUDTable from '~/components/molecules/CRUDTable';
import {
  useGetAssignment,
  useGetIdFromUrl,
  useMutationSubmitPointAssignment,
  useTryCatch,
} from '~/hooks';
import { useBoolean } from '~/hooks/useBoolean';
import globalStyles from '~/styles';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';
import { formatStringToNumber } from '~/utils/number';
import toast from '~/utils/toast';
import { openUrl } from '~/utils/window';
import { DownloadButtonAssignment } from './DownloadButtonAssigment';

export interface AssignmentItemPayload {
  id: number;
  studentId: number;
  studentName: string;
  file: Blob[] | undefined;
  timeSubmit: string;
}
export interface AssignmentSubmitItemPayload {
  created: string;
  lastModified: string;
  createdBy: string;
  lastModifiedBy: string;
  id: number;
  point: number;
  note: string;
}

export default function MentorClassAssignmentPage({
  assignmentId,
}: {
  assignmentId: number;
}) {
  const moduleId = useGetIdFromUrl('moduleId');
  const id = useGetIdFromUrl('id');
  const { control, handleSubmit } = useForm();

  const { value, toggle } = useBoolean(false);

  const {
    data: assignments,
    error,
    isLoading,
  } = useGetAssignment(assignmentId, id);

  const { mutateAsync } = useMutationSubmitPointAssignment();

  const { handleTryCatch } = useTryCatch('nộp bài tập');

  const onSubmit = async (data: any) => {
    if (assignments?.length !== 0) {
      const points: string[] = data.point;
      const notes: string[] = data.note;
      const params: AssignmentSubmitItemPayload[] =
        assignments?.map((item, index) => ({
          created: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          id: item.id,
          createdBy: item.studentName,
          lastModifiedBy: item.studentName,
          point: formatStringToNumber(points[index]),
          note: notes[index],
        })) || [];

      await handleTryCatch(async () =>
        mutateAsync({
          id: assignmentId,
          params,
        })
      );
      toggle();
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
    },
    {
      field: 'studentName',
      headerName: 'Tên học sinh',
      flex: 3,
    },
    {
      field: 'timeSubmit',
      headerName: 'Thời gian nộp bài',
      flex: 2,
      renderCell: (data) => {
        return formatISODateDateToDisplayDateTime(data.row.timeSubmit);
      },
    },
    {
      field: 'file',
      headerName: 'Bài làm',
      flex: 2,
      renderCell: (data) => {
        return <DownloadButtonAssignment data={data} />;
      },
    },
    {
      field: 'point',
      headerName: 'Chấm điểm',
      flex: 2,
      renderCell: (data) => {
        return (
          <FormInput
            control={control}
            variant="number"
            placeholder="Nhập số điểm"
            name={`point.${data.api.getRowIndex(data.row.id)}`}
          />
        );
      },
    },
    {
      field: 'note',
      headerName: 'Ghi chú',
      flex: 2,
      renderCell: (data) => {
        return (
          <FormInput
            control={control}
            variant="text"
            placeholder="Nhập ghi chú"
            name={`note.${data.api.getRowIndex(data.row.id)}`}
          />
        );
      },
    },
  ];
  return (
    <Stack>
      <Typography sx={globalStyles.textSmallLabel}>
        Danh sách bài làm của học sinh
      </Typography>
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <CRUDTable
          error={error}
          isLoading={isLoading}
          columns={columns}
          rows={assignments || []}
        />
        <Box marginTop={1}>
          <Button
            disabled={assignments?.length === 0}
            color="success"
            variant="contained"
            onClick={toggle}
          >
            Chấm điểm
          </Button>
        </Box>
        <ConfirmDialog
          open={value}
          handleClose={toggle}
          handleAccept={handleSubmit(onSubmit)}
          content="Bạn chắc chắn nộp bài chấm điểm này?"
          title="Xác nhận nộp bài chấm điểm ?"
        />
      </Stack>
    </Stack>
  );
}
