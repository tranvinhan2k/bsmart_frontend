import React from 'react';

import { Stack } from '@mui/material';

import FeedbackManagerTemplate from '~/containers/FeedbackManagerSection/FeedbackManagerTemplate';

import { scrollToTop } from '~/utils/common';
import { FeedbackTypeKeys } from '~/models/variables';

export interface FeedbackManagerPayload {
  id: number;
  name: string;
  type: FeedbackTypeKeys;
  isDefault: boolean;
  isFixed: boolean;
  questions: {
    question: string;
    answers: {
      answer: string;
    }[];
  }[];
}

export default function FeedbackManagerPage() {
  React.useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Stack padding={3}>
      <FeedbackManagerTemplate />
    </Stack>
  );
}
