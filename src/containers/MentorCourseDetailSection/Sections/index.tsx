import { Box, Stack, Typography } from '@mui/material';

import { image } from '~/constants/image';
import { MetricSize } from '~/assets/variables';
import { ActivityPayload } from '~/models/type';
import SectionCollapse from './SectionCollapse';

interface Props {
  content: ActivityPayload[] | undefined;
}

export default function Sections({ content }: Props) {
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

  return (
    <Stack>
      {content.map((section, index) => (
        <SectionCollapse key={index} index={index} section={section} />
      ))}
    </Stack>
  );
}
