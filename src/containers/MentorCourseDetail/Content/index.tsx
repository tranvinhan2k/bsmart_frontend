import { useState } from 'react';
import { Stack } from '@mui/material';
import { PostActivityCoursePayload } from '~/models';
import {
  useMutationAddSection,
  useMutationDeleteContent,
  useMutationUpdateContent,
  useQueryGetCourseContent,
  useTryCatch,
} from '~/hooks';
import Sections from '../Sections';
import AddSection from '../AddSection';
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';

interface Props {
  id: number;
}

export default function Content({ id }: Props) {
  const [open, setOpen] = useState(false);
  const addCourseContent = useMutationAddSection({
    authorizeClasses: [],
    courseId: 0,
    name: '',
    parentActivityId: 0,
    visible: false,
  });
  const deleteCourseContent = useMutationDeleteContent();
  const updateCourseContent = useMutationUpdateContent();
  const addContentSection = useTryCatch('thêm học phần');
  const updateContent = useTryCatch('cập nhật nội dung');
  const deleteContent = useTryCatch('xóa nội dung');

  const {
    data: content,
    error,
    isLoading,
    refetch,
  } = useQueryGetCourseContent(id);

  const handleAddNewSection = async (name: string) => {
    const params: PostActivityCoursePayload = {
      name,
      lessons: [],
    };
    await addContentSection.handleTryCatch(async () => {
      await addCourseContent.mutateAsync({ id, params });
    });

    await refetch();
  };

  const handleAddNewModule = async (sectionId: number, name: string) => {
    const section = content?.find((item) => item.id === sectionId);
    await refetch();
  };

  const handleCloseConfirm = () => {
    setOpen(!open);
  };

  const handleDeleteContent = () => {
    deleteContent.handleTryCatch(async () =>
      deleteCourseContent.mutateAsync(id)
    );
    handleCloseConfirm();
  };

  return (
    <Stack>
      <LoadingWrapper error={error} isLoading={isLoading}>
        <Sections content={content} onAddNew={handleAddNewModule} />
      </LoadingWrapper>
      <AddSection onAdd={handleAddNewSection} />
      {/* <Stack>
        <Button
          onClick={handleCloseConfirm}
          sx={{
            marginTop: 1,
            color: Color.white,
          }}
          variant="contained"
          color="error"
        >
          Xóa nội dung môn học
        </Button>
        <ConfirmDialog
          open={open}
          title="Xác nhận xóa nội dung"
          content="Bạn có chắc chắn xóa nội dung này không?"
          handleClose={handleCloseConfirm}
          handleAccept={handleDeleteContent}
        />
      </Stack> */}
    </Stack>
  );
}
