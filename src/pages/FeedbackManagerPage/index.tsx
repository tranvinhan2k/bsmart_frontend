import React from 'react';

import { Stack } from '@mui/material';

import FeedbackManagerTemplate from '~/containers/FeedbackManagerSection/FeedbackManagerTemplate';

import { scrollToTop } from '~/utils/common';
import { FeedbackQuestionTypeKeys, FeedbackTypeKeys } from '~/models/variables';
import ClassFeedbackDetailPage from '../ClassFeedbackDetailPage';
import CustomTab from '~/components/atoms/CustomTab';
import { Color } from '~/assets/variables';

export interface FeedbackManagerPayload {
  id: number;
  name: string;
  type: FeedbackTypeKeys;
  isDefault: boolean;
  isFixed: boolean;
  questions: {
    question: string;
    answerType: FeedbackQuestionTypeKeys;
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
    <Stack
      padding={3}
      sx={{
        background: Color.white,
      }}
    >
      <FeedbackManagerTemplate />
    </Stack>
  );
}
