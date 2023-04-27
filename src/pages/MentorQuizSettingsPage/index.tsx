import { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Stack } from '@mui/material';
import { scrollToTop } from '~/utils/common';
import ResourceMentorQuestionBank from '~/components/molecules/ResourceManagement/ResourceMentorQuestionBank';
import TabPanel from '~/components/atoms/TabPanel/index';

import GeneralSettings from './GeneralSettings';
import QuestionSettings from './QuestionSettings';

export default function MentorQuizSetting() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (_: any, newValue: number) => setTabValue(newValue);

  const tabEl = [
    {
      id: 0,
      text: 'Thông tin chung',
      component: <GeneralSettings />,
    },
    {
      id: 1,
      text: 'Câu hỏi',
      component: <QuestionSettings />,
    },
    {
      id: 2,
      text: 'Ngân hàng câu hỏi',
      component: <ResourceMentorQuestionBank />,
    },
  ];

  return (
    <Box pr={15} pl={15}>
      <Stack
        direction={{ sm: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={{ sm: 2, md: 0 }}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        pb={{ sm: 2, md: 0 }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Tabs value={tabValue} onChange={handleSetTabValue}>
            {tabEl.map((tab) => (
              <Tab label={tab.text} key={tab.id} />
            ))}
          </Tabs>
        </Stack>
      </Stack>
      {tabEl.map((tab) => (
        <TabPanel value={tabValue} index={tab.id} key={tab.id}>
          <Box py={2}>{tab.component}</Box>
        </TabPanel>
      ))}
    </Box>
  );
}
