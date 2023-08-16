import { Box, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';

// hooks
import { useContext, useState } from 'react';
import {
  useMutationDeleteClass,
  useQueryGetMentorCourseClasses,
  useTryCatch,
  useUpdateMentorClassesForm,
} from '~/hooks';

// components
import CreateClassModal from '~/components/molecules/FormComponent/CreateCourseForm/CreateClassModal';
import UpdateClassModal from '~/components/molecules/FormComponent/CreateCourseForm/UpdateClassModal';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import Classes from '~/components/molecules/list/Classes';

// HOCs
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';

// utils
import { formatStringToNumber } from '~/utils/number';
import { useCreateClassesForm } from '~/hooks/form.hooks/useCreateClassesForm';
import SearchBar from '~/components/atoms/SearchBar';
import CustomPagination from '~/components/atoms/CustomPagination';
import { CourseContext } from '~/HOCs/context/CourseContext';

const TEXTS = {
  DELETE_CONTENT: 'Bạn có chắc chắn muốn xóa giờ học này ?',
  DELETE_TITLE: 'Xác nhận xóa giờ học',
};

export default function MentorCourseClassesPage() {
  const { id } = useParams();
  const courseId = formatStringToNumber(id);

  const { refetchPercent } = useContext(CourseContext);

  const [deleteId, setDeleteId] = useState(-1);

  // hooks

  const {
    classes,
    currentPage,
    setFilterParam,
    totalPages,
    error,
    isLoading,
    filterParam,
    refetch,
  } = useQueryGetMentorCourseClasses(courseId);

  const {
    open,
    createSubCourseHookForm,
    onTriggerModal,
    onAddNewClass,
    mode,
    timetable,
    handleAddTimetable,
    handleResetCreateCourse,
    handleBackCreateCourse,
  } = useCreateClassesForm(courseId, refetchPercent);
  const { onUpdateClass, updateClassHookForm, handleChangeDefaultValue } =
    useUpdateMentorClassesForm(courseId, classes);

  const { handleTryCatch: handleTryCatchDelete } = useTryCatch('xóa lớp học');
  const { mutateAsync: handleMutationDeleteClass } = useMutationDeleteClass();

  // functions
  const handleChangePage = (e: any, page: number) => {
    setFilterParam({
      ...filterParam,
      page: page - 1,
    });
  };
  const handleChangeSearchValue = (searchValue: string) => {
    setFilterParam({
      ...filterParam,
      q: searchValue,
    });
  };
  const handleDeleteClass = async () => {
    await handleTryCatchDelete(async () => {
      await handleMutationDeleteClass(deleteId);
      await refetch();
      onTriggerModal();
    });
  };
  const handleCreateClass = async (data: any) => {
    await onAddNewClass(data);
    await refetch();
  };
  const handleConfirmTimetable = async (data: any) => {
    await handleAddTimetable(data);
  };
  const handleUpdateClass = async (data: any) => {
    await onUpdateClass(data);
    await refetch();
    onTriggerModal();
  };
  const handleOpenAddModal = () => {
    onTriggerModal('CREATE');
  };
  const handleOpenUpdateModal = (index: number) => {
    onTriggerModal('UPDATE');
    handleChangeDefaultValue(index);
  };
  const handleDeleteModal = (paramId: number) => {
    setDeleteId(paramId);
    onTriggerModal('DELETE');
  };

  return (
    <Box marginTop={2}>
      <Stack>
        <LoadingWrapper error={error} isLoading={isLoading}>
          <Stack>
            <SearchBar
              color="white"
              onSubmit={handleChangeSearchValue}
              placeholder="Tìm lớp học cùa bạn"
              value={filterParam.q || ''}
            />
          </Stack>
          <Stack marginTop={1}>
            <Classes
              classes={classes}
              onOpenAddModal={handleOpenAddModal}
              onOpenUpdateModal={handleOpenUpdateModal}
              onDeleteModal={handleDeleteModal}
            />
          </Stack>
          <Stack
            marginTop={1}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CustomPagination
              currentPage={currentPage}
              onChange={handleChangePage}
              totalPages={totalPages}
            />
          </Stack>
        </LoadingWrapper>
        {mode === 'CREATE' && (
          <CreateClassModal
            timetable={timetable}
            open={open}
            hookForm={createSubCourseHookForm}
            onClose={onTriggerModal}
            onSubmit={handleCreateClass}
            onBack={handleBackCreateCourse}
            onReset={handleResetCreateCourse}
            onViewSchedule={handleConfirmTimetable}
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
            title={TEXTS.DELETE_TITLE}
            content={TEXTS.DELETE_CONTENT}
            open={open}
            handleAccept={handleDeleteClass}
            handleClose={onTriggerModal}
          />
        )}
      </Stack>
    </Box>
  );
}
