import { Box, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';

// hooks
import {
  useQueryGetMentorCourseClasses,
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

const TEXTS = {
  DELETE_CONTENT: 'Bạn có chắc chắn muốn xóa giờ học này ?',
  DELETE_TITLE: 'Xác nhận xóa giờ học',
};

export default function MentorCourseClassesPage() {
  const { id } = useParams();
  const courseId = formatStringToNumber(id);

  // hooks

  const {
    classes,
    currentPage,
    setFilterParam,
    totalPages,
    error,
    isLoading,
    filterParam,
  } = useQueryGetMentorCourseClasses(courseId);

  const {
    open,
    createSubCourseHookForm,
    onTriggerModal,
    onAddNewClass,
    mode,
    timetable,
    handleAddTimetable,
  } = useCreateClassesForm(courseId);
  const { onUpdateClass, updateClassHookForm, handleChangeDefaultValue } =
    useUpdateMentorClassesForm(courseId, classes);

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
  const handleDeleteClass = async () => {};
  const handleCreateClass = async (data: any) => {
    await onAddNewClass(data);
  };
  const handleConfirmTimetable = async () => {
    await handleAddTimetable();
    onTriggerModal();
  };
  const handleUpdateClass = async (data: any) => {
    await onUpdateClass(data);
    onTriggerModal();
  };
  const handleOpenAddModal = () => {
    onTriggerModal('CREATE');
  };
  const handleOpenUpdateModal = (index: number) => {
    onTriggerModal('UPDATE');
    handleChangeDefaultValue(index);
  };
  const handleDeleteModal = () => {
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
              value={filterParam.q}
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
            onConfirmTimetable={handleConfirmTimetable}
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
