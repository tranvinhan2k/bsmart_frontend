import { Box, Stack } from '@mui/material';

// Custom Hooks
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from '@tanstack/react-query';
import { useCreateClassesForm, useUpdateMentorClassesForm } from '~/hooks';

// CreateCourseForm
import CreateClassModal from '../CreateCourseForm/CreateClassModal';
import UpdateClassModal from '../CreateCourseForm/UpdateClassModal';

// MentorCourseDetailPage
import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';

// HOCs
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';

// Components
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import Classes from '../../list/Classes';
import { PagingFilterPayload } from '~/models';

export interface CreateClassesFormProps {
  id: number;
  classes: DetailCourseClassPayload[] | undefined;
  isLoading: boolean;
  error: any;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<
    QueryObserverResult<PagingFilterPayload<DetailCourseClassPayload>, unknown>
  >;
}

export default function CreateClassesForm({
  id,
  classes,
  error,
  isLoading,
}: CreateClassesFormProps) {
  const { open, createSubCourseHookForm, onTriggerModal, onAddNewClass, mode } =
    useCreateClassesForm(id);
  const { onUpdateClass, updateClassHookForm, handleChangeDefaultValue } =
    useUpdateMentorClassesForm(id, classes);

  const handleDeleteClass = async () => {};

  const handleCreateClass = async (data: any) => {
    await onAddNewClass(data);
    onTriggerModal();
  };
  const handleUpdateClass = async (data: any) => {
    await onUpdateClass(data);
    onTriggerModal();
  };

  return (
    <Box marginTop={2}>
      <Stack>
        <LoadingWrapper error={error} isLoading={isLoading}>
          <Classes
            classes={classes}
            onOpenAddModal={() => onTriggerModal('CREATE')}
            onOpenUpdateModal={(index: number) => {
              onTriggerModal('UPDATE');
              handleChangeDefaultValue(index);
            }}
            onDeleteModal={() => onTriggerModal('DELETE')}
          />
        </LoadingWrapper>
        {mode === 'CREATE' && (
          <CreateClassModal
            open={open}
            hookForm={createSubCourseHookForm}
            onClose={onTriggerModal}
            onSubmit={handleCreateClass}
          />
        )}
        {mode === 'UPDATE' && (
          <UpdateClassModal
            open={open}
            hookForm={updateClassHookForm}
            onClose={onTriggerModal}
            onSubmit={handleUpdateClass}
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
