import { Box, Stack, Typography } from '@mui/material';

import { useParams } from 'react-router-dom';
import { image } from '~/constants/image';
import { Color, MetricSize } from '~/assets/variables';
import AddModule from '../AddModule';
import {
  useMutationDeleteContent,
  useMutationUpdateContent,
  useTimeOut,
  useTryCatch,
} from '~/hooks';
import Section from '../Section.ts';
import Module from '../Module';
import { ActivityPayload } from '~/models/type';
import { formatStringToNumber } from '~/utils/number';

interface Props {
  content: ActivityPayload[] | undefined;
  refetch: any;
}

export default function Sections({ content, refetch }: Props) {
  const { id } = useParams();
  const courseId = formatStringToNumber(id);

  const updateModule = useTryCatch('cập nhật bài học');

  const { mutateAsync: handleDeleteContent } = useMutationDeleteContent();
  const { handleMutationUpdateLesson } = useMutationUpdateContent();

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

  const handleUpdateModule = async (
    sectionId: number,
    data: {
      id: number;
      name: string;
      description: string;
      visible: boolean;
      authorizeClasses: string[];
    }
  ) => {
    await updateModule.handleTryCatch(async () =>
      handleMutationUpdateLesson({
        id: data.id,
        params: {
          name: data.name,
          description: data.description,
          visible: data.visible,
          parentActivityId: sectionId,
          authorizeClasses:
            data.authorizeClasses?.map((item) => formatStringToNumber(item)) ||
            [],
          courseId,
        },
      })
    );
    await refetch();
  };

  return (
    <Stack>
      {content.map((section, index) => (
        <Stack
          sx={{ marginTop: 1, padding: 2, background: Color.whiteSmoke }}
          key={index}
        >
          <Section index={index} section={section} />
          <Stack sx={{ marginTop: 1, paddingY: 1 }}>
            {section?.subActivities.map((module, idx) => (
              <Module
                key={idx}
                index={idx}
                sectionId={section.id}
                module={module}
              />
            ))}
          </Stack>
          <AddModule id={section.id} refetch={refetch} />
        </Stack>
      ))}
    </Stack>
  );
}
