import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Color, MetricSize } from '~/assets/variables';
import globalStyles from '~/styles';
import CreateClassSection from './CreateClassSection';
import ClassSectionList from './ClassSectionList';
import { SectionProps } from '~/models/section';
import { useMutationCreateCourse } from '~/hooks';
import { useMutationCreateContent } from '~/hooks/useMutationCreateContent';
import Button from '~/components/atoms/Button';
import toast from '~/utils/toast';

export default function CreateContentPage() {
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
    } catch (error: any) {
      toast.updateFailedToast(
        idNotify,
        `Thêm nội dung khóa học không thành công: ${error.message}`
      );
    }
  };

  return (
    <Stack>
      <Typography sx={globalStyles.textTitle}>Tạo nội dung khóa học</Typography>
      <Stack
        sx={{
          background: Color.white3,
          padding: MetricSize.medium_15,
          borderRadius: MetricSize.small_5,
          marginTop: 2,
          marginBottom: 1,
        }}
      >
        <Typography sx={globalStyles.textSubTitle}>
          Danh sách nội dung
        </Typography>
        <ClassSectionList content={content} onAddNew={handleAddNewModule} />
        <CreateClassSection onAddNew={handleAddNewSection} />
        <Stack marginTop={1}>
          <Button onClick={handleCreateContent} customVariant="normal">
            Lưu nội dung khóa học
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
