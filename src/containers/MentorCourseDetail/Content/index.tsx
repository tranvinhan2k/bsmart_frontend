import { useEffect, useState } from 'react';

import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { SectionProps } from '~/models/section';
import { useTimeOut, useTryCatch } from '~/hooks';
import { useMutationCreateContent } from '~/hooks/useMutationCreateContent';
import toast from '~/utils/toast';
import Sections from '../Sections';
import AddSection from '../AddSection';
import LoadingWrapper from '~/HOCs/LoadingWrapper';

export default function Content() {
  const { onSleep } = useTimeOut(1000);
  const { error, isLoading, handleTryCatch } = useTryCatch();

  const { id } = useParams();
  const createCourseContentMutation = useMutationCreateContent();

  const [content, setContent] = useState<SectionProps[]>([
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

  const handleCreateContent = async () => {
    const idNotify = toast.loadToast('Đang thêm nội dung khóa học ...');
    try {
      const params = {
        id: parseInt(`${id}`, 10),
        data: content.map((item) => ({ sections: item })),
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
    </Stack>
  );
}
