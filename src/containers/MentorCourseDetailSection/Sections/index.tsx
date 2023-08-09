import { Box, Stack, Typography } from '@mui/material';

import React, { useContext, useEffect } from 'react';
import { image } from '~/constants/image';
import { MetricSize } from '~/assets/variables';
import { ActivityPayload } from '~/models/type';
import SectionCollapse from './SectionCollapse';
import { CourseStatusKeys } from '~/models/variables';
import { CourseContext } from '~/HOCs/context/CourseContext';

interface Props {
  content: ActivityPayload[] | undefined;
  status: CourseStatusKeys;
}

export default function Sections({ content, status }: Props) {
  const { sectionId } = useContext(CourseContext);

  const refs = content?.reduce((acc: any, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});

  const handleClick = (id: number) => {
    if (refs?.[id]?.current) {
      refs[id].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleScrollIntoView = () => {
    handleClick(sectionId);
  };

  useEffect(() => {
    handleScrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId, content]);

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
      {content?.map((section, index) => (
        <SectionCollapse
          ref={refs[section.id]}
          status={status}
          key={index}
          index={index}
          section={section}
        />
      ))}
    </Stack>
  );
}
