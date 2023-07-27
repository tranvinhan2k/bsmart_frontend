import { Box, Button, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import CRUDTable from '~/components/molecules/CRUDTable';
import {
  useGetAssignment,
  useGetIdFromUrl,
  useMutationSubmitPointAssignment,
  useTryCatch,
} from '~/hooks';
import globalStyles from '~/styles';
import { formatISODateDateToDisplayDateTime } from '~/utils/date';
import { formatStringToNumber } from '~/utils/number';
import { openUrl } from '~/utils/window';

export interface AssignmentItemPayload {
  id: number;
  studentId: number;
  studentName: string;
  file: Blob | undefined;
  timeSubmit: string;
}
export interface AssignmentSubmitItemPayload {
  id: number;
  studentId: number;
  studentName: string;
  file: Blob | undefined;
  timeSubmit: string;
  point: number;
}

export default function MentorClassAssignmentPage() {
  const moduleId = useGetIdFromUrl('moduleId');
  const { control, handleSubmit } = useForm();

  const { data: assignments, error, isLoading } = useGetAssignment(moduleId);

  const { mutateAsync } = useMutationSubmitPointAssignment();

  const { handleTryCatch } = useTryCatch('nộp bài tập');

  const onSubmit = async (data: any) => {
    if (assignments) {
      const points: string[] = data.point;
      const params: AssignmentSubmitItemPayload[] = assignments.map(
        (item, index) => ({
          ...item,
          point: formatStringToNumber(points[index]),
        })
      );
      console.log('params', params);

      await handleTryCatch(async () =>
        mutateAsync({
          id: moduleId,
          params,
        })
      );
    }
    console.log('data', data);
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
      flex: 4,
    },
    {
      field: 'timeSubmit',
      headerName: 'Thời gian nộp bài',
      flex: 1,
      renderCell: (data) => {
        return formatISODateDateToDisplayDateTime(data.row.timeSubmit);
      },
    },
    {
      field: 'file',
      headerName: 'Bài làm',
      width: 120,
      renderCell: (data) => {
        return (
          <Button
            sx={{
              alignSelf: 'center',
            }}
            variant="contained"
            color="success"
            startIcon={<Icon name="download" size="small_20" color="white" />}
            onClick={() => openUrl(data.row?.file?.url)}
          >
            Tải về
          </Button>
        );
      },
    },
    {
      field: 'point',
      headerName: 'Chấm điểm',
      flex: 1,
      renderCell: (data) => {
        return (
          <FormInput
            control={control}
            variant="number"
            name={`point.${data.api.getRowIndex(data.row.id)}`}
          />
        );
      },
    },
  ];
  return (
    <Stack>
      <Typography sx={globalStyles.textSubTitle}>
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
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Thêm danh sách châm điểm
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}
