import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Stack, Typography } from '@mui/material';
import { MetricSize } from '~/assets/variables';
import globalStyles from '~/styles';
import CreateClassSection from './CreateClassSection';
import ClassSectionList from './ClassSectionList';
import { SectionProps } from '~/models/section';

export default function CreateContentPage() {
  const [content, setContent] = useState<SectionProps[]>([
    {
      id: 0,
      name: 'Giới thiệu',
      introduce: '',
      modules: [
        {
          id: 0,
          name: 'Giới thiệu',
        },
      ],
    },
  ]);

  const handleAddNewSection = (name: string, introduce: string) => {
    setContent([
      ...content,
      {
        id: content?.length,
        name,
        introduce,
        modules: [],
      },
    ]);
  };

  const handleAddNewModule = (id: number, name: string) => {
    const tmpContent = content.map((section) => {
      if (section.id === id) {
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

    console.log('module', id, name, tmpContent);

    setContent(tmpContent);
  };

  return (
    <Stack>
      <Typography sx={globalStyles.textTitle}>Tạo nội dung khóa học</Typography>
      <Stack
        sx={{
          padding: MetricSize.medium_15,
          borderRadius: MetricSize.small_10,
          marginTop: 2,
        }}
      >
        <Typography sx={globalStyles.textSubTitle}>
          Danh sách nội dung
        </Typography>
        <ClassSectionList content={content} onAddNew={handleAddNewModule} />
        <CreateClassSection onAddNew={handleAddNewSection} />
      </Stack>
    </Stack>
  );
}
