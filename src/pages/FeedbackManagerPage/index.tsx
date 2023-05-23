import React from 'react';

import { Stack } from '@mui/material';

import TabsLayout, { TabPanelData } from '~/components/molecules/TabsLayout';

import FeedbackManagerTemplate from '~/containers/FeedbackManagerSection/FeedbackManagerTemplate';
import FeedbackManagerQuestion from '~/containers/FeedbackManagerSection/FeedbackManagerQuestion';

import { scrollToTop } from '~/utils/common';

export default function FeedbackManagerPage() {
  const data: TabPanelData = [
    {
      label: 'Bản mẫu',
      renderItem: <FeedbackManagerTemplate />,
    },
    {
      label: 'Câu hỏi',
      renderItem: <FeedbackManagerQuestion />,
    },
  ];

  React.useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Stack padding={3}>
      <TabsLayout data={data} />
    </Stack>
  );
}
