import { Box, Stack, Typography } from '@mui/material';

import { image } from '~/constants/image';
import { Color, MetricSize } from '~/assets/variables';
import AddModule from '../AddModule';
import { SectionPayload } from '~/models/section';
import { useTimeOut, useTryCatch } from '~/hooks';
import Section from '../Section.ts';
import Module from '../Module';

interface Props {
  content: SectionPayload[] | undefined;
  onAddNew: (id: number, name: string) => void;
}

export default function Sections({ content, onAddNew }: Props) {
  const { onSleep } = useTimeOut(1000);

  const deleteSection = useTryCatch({
    error: 'Xóa học phần thất bại',
    loading: 'Đang xóa học phần',
    success: 'Xóa học phần thành công',
  });
  const deleteModule = useTryCatch({
    error: 'Xóa bài học thất bại',
    loading: 'Đang xóa bài học',
    success: 'Xóa bài học thành công',
  });
  const updateModule = useTryCatch({
    error: 'Cập nhật bài học thất bại',
    loading: 'Đang cập nhật bài học',
    success: 'Cập nhật bài học thành công',
  });
  const { handleTryCatch } = useTryCatch({
    error: 'Không cập nhật được nội dung học phần',
    loading: 'Đang cập nhật nội dung học phần...',
    success: 'Cập nhật thành công',
  });

  if (content === undefined || content.length === 0) {
    return (
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: MetricSize.large_20,
        }}
      >
        <Box
          component="img"
          alt="no section"
          src={image.emptyCourseList}
          sx={{
            height: '200px',
            width: '200px',
            objectFit: 'contain',
          }}
        />
        <Typography>Danh sách học phần đang trống .</Typography>
      </Stack>
    );
  }

  const handleAddNew = (id: number, name: string) => {
    onAddNew(id, name);
  };

  const handleUpdateSection = async () => {
    // TODO: cap nhat section
    await handleTryCatch(() => onSleep(true));
  };
  const handleDeleteSection = async () => {
    // TODO: xóa section
    await deleteSection.handleTryCatch(() => onSleep(true));
  };
  const handleUpdateModule = async () => {
    // TODO: cap nhat module
    await updateModule.handleTryCatch(() => onSleep(true));
  };
  const handleDeleteModule = async () => {
    // TODO: cap nhat module
    await deleteModule.handleTryCatch(() => onSleep(true));
  };

  return (
    <Stack>
      {content.map((section) => (
        <Stack
          sx={{ marginTop: 1, padding: 2, background: Color.whiteSmoke }}
          key={section.id}
        >
          <Section
            section={section}
            onDelete={handleDeleteSection}
            onUpdate={handleUpdateSection}
          />
          <Stack sx={{ marginTop: 1, paddingY: 1 }}>
            {section?.modules.map((module: any) => (
              <Module
                key={module}
                module={module}
                onDelete={handleDeleteModule}
                onUpdate={handleUpdateModule}
              />
            ))}
          </Stack>
          <AddModule id={section.id} onAdd={handleAddNew} />
        </Stack>
      ))}
    </Stack>
  );
}
