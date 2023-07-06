import { Box, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useCreateClassesForm, useTimeOut, useTryCatch } from '~/hooks';
import CreateClassModal from '../CreateCourseForm/CreateClassModal';
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import LoadingWrapper from '~/HOCs/LoadingWrapper';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import UpdateClassModal from '../CreateCourseForm/UpdateClassModal';
import Classes from '../../list/Classes';

export interface CreateClassesFormProps {
  classes: DetailCourseClassPayload[];
  onChangeClasses: (params: DetailCourseClassPayload[]) => void;
}

export default function CreateClassesForm({
  classes,
  onChangeClasses,
}: CreateClassesFormProps) {
  const {
    open,
    levels,
    types,
    createSubCourseHookForm,
    onTriggerModal,
    onAddNewClass,
    mode,
  } = useCreateClassesForm(classes, onChangeClasses);

  const { error, handleTryCatch, isLoading } = useTryCatch();
  const deleteTryCatch = useTryCatch({
    error: 'Xóa lớp học thất bại',
    loading: 'Đang xóa lớp học...',
    success: 'Xóa lớp học thành công',
  });
  const { onSleep } = useTimeOut(1000);

  useEffect(() => {
    handleTryCatch(() => onSleep(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteClass = async () => {
    await deleteTryCatch.handleTryCatch(() => onSleep(true));
  };

  return (
    <Box marginTop={2}>
      <Stack>
        <LoadingWrapper error={error} isLoading={isLoading}>
          <Classes
            classes={classes}
            onOpenAddModal={() => onTriggerModal('CREATE')}
            onOpenUpdateModal={() => onTriggerModal('UPDATE')}
            onDeleteModal={() => onTriggerModal('DELETE')}
          />
        </LoadingWrapper>
        {mode === 'CREATE' && (
          <CreateClassModal
            open={open}
            hookForm={createSubCourseHookForm}
            levels={levels}
            types={types}
            onClose={onTriggerModal}
            onSubmit={onAddNewClass}
          />
        )}
        {mode === 'UPDATE' && (
          <UpdateClassModal
            open={open}
            hookForm={createSubCourseHookForm}
            levels={levels}
            types={types}
            onClose={onTriggerModal}
            onSubmit={onAddNewClass}
          />
        )}
        {mode === 'DELETE' && (
          <ConfirmDialog
            content="Bạn có chắc chắn muốn xóa giờ học này ?"
            title="Xác nhận xóa giờ học"
            open={open}
            handleAccept={handleDeleteClass}
            handleClose={onTriggerModal}
          />
        )}
      </Stack>
    </Box>
  );
}
