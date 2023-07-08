import { useEffect, useState } from 'react';

import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { SectionPayload } from '~/models/section';
import { useMutationAddContent, useTimeOut, useTryCatch } from '~/hooks';
import toast from '~/utils/toast';
import Sections from '../Sections';
import AddSection from '../AddSection';
import LoadingWrapper from '~/HOCs/loading/LoadingWrapper';
import Button from '~/components/atoms/Button';
import { Color } from '~/assets/variables';
import { PostActivityCoursePayload } from '~/models/request';

export default function Content() {
  const { onSleep } = useTimeOut(1000);
  const { error, isLoading, handleTryCatch } = useTryCatch();

  const { id } = useParams();
  const createCourseContentMutation = useMutationAddContent();

  // TODO: param nayf nếu tồn tại content cũ, thì chuyển sang mode update
  const isExistedOldContent = false;

  const [content, setContent] = useState<SectionPayload[]>([
    {
      id: 0,
      name: 'Giới thiệu',
      modules: [
        {
          id: 0,
          name: 'Giới thiệu',
        },
      ],
    },
  ]);

  const handleAddNewSection = (name: string) => {
    setContent([
      ...content,
      {
        id: content?.length,
        name,
        modules: [],
      },
    ]);
  };

  const handleAddNewModule = (sectionId: number, name: string) => {
    const tmpContent = content.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          modules: [
            ...section.modules,
            {
              id: section.modules.length,
              name,
            },
          ],
        };
      }
      return section;
    });

    setContent(tmpContent);
  };

  const handleDeleteContent = () => {
    // TODO: Xóa nội dung content
  };

  const handleUpdateContent = () => {
    // TODO: Thêm api update content ở dây
  };

  const handleAddNewContent = async () => {
    const idNotify = toast.loadToast('Đang thêm nội dung khóa học ...');
    try {
      const params: { id: number; param: PostActivityCoursePayload } = {
        id: parseInt(`${id}`, 10),
        param: {
          name: content[0].name,
          lessons: content[0].modules.map((lesson) => ({
            description: lesson.name,
          })),
        },
      };

      await createCourseContentMutation.mutateAsync(params);
      toast.updateSuccessToast(idNotify, 'Thêm nội dung khóa học thành công');
    } catch (e: any) {
      toast.updateFailedToast(
        idNotify,
        `Thêm nội dung khóa học không thành công: ${e.message}`
      );
    }
  };

  useEffect(() => {
    handleTryCatch(() => onSleep(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <Stack>
      <LoadingWrapper error={error} isLoading={isLoading}>
        <Sections content={content} onAddNew={handleAddNewModule} />
      </LoadingWrapper>
      <AddSection onAdd={handleAddNewSection} />
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={
            isExistedOldContent ? handleUpdateContent : handleAddNewContent
          }
          sx={{
            color: Color.white,
          }}
          variant="contained"
          color="secondary"
        >
          {isExistedOldContent
            ? 'Lưu nội dung môn học'
            : 'Thêm nội dung môn học'}
        </Button>

        <Button
          onClick={handleDeleteContent}
          sx={{
            marginLeft: 1,
            color: Color.white,
          }}
          variant="contained"
          color="error"
        >
          Xóa nội dung môn học
        </Button>
      </Stack>
    </Stack>
  );
}
