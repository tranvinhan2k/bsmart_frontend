import { useEffect, useState } from 'react';

import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { SectionPayload } from '~/models/section';
import {
  useCustomQuery,
  useMutationAddContent,
  useMutationDeleteContent,
  useQueryGetCourseContent,
  useTimeOut,
  useTryCatch,
} from '~/hooks';
import toast from '~/utils/toast';
import Sections from '../Sections';
import AddSection from '../AddSection';
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';
import Button from '~/components/atoms/Button';
import { Color } from '~/assets/variables';
import { PostActivityCoursePayload } from '~/models';
import CustomModal from '~/components/atoms/CustomModal';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';

interface Props {
  id: number;
}

export default function Content({ id }: Props) {
  const [open, setOpen] = useState(false);

  const createCourseContentMutation = useMutationAddContent();
  const addCourseContent = useMutationAddContent();
  const deleteCourseContent = useMutationDeleteContent();
  const addContentSection = useTryCatch('thêm học phần');
  const deleteContent = useTryCatch('xóa nội dung');

  const {
    data: content,
    error,
    isLoading,
    refetch,
  } = useQueryGetCourseContent(id);

  // TODO: param nayf nếu tồn tại content cũ, thì chuyển sang mode update
  const isExistedOldContent = false;

  const handleAddNewSection = async (name: string) => {
    const params: PostActivityCoursePayload = {
      name,
      lessons: [],
    };
    addContentSection.handleTryCatch(async () =>
      addCourseContent.mutateAsync({ id, params })
    );
    await refetch();
  };

  const handleAddNewModule = (sectionId: number, name: string) => {
    // TODO: add new module
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

  const handleUpdateContent = () => {
    // TODO: Thêm api update content ở dây
  };

  return (
    <Stack>
      <LoadingWrapper
        error={error}
        isLoading={isLoading}
        isEmptyCourse={content?.length === 0}
      >
        <Sections content={content} onAddNew={handleAddNewModule} />
      </LoadingWrapper>
      <AddSection onAdd={handleAddNewSection} />
      <Stack>
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
          content="Bạn có chắc chắn xóa nội dung này không ?"
          handleClose={handleCloseConfirm}
          handleAccept={handleDeleteContent}
        />
      </Stack>
    </Stack>
  );
}
