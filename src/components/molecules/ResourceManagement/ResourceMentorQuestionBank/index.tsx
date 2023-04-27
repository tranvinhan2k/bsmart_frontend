import { useState } from 'react';
import { Box, Tab, Tabs, Stack } from '@mui/material';
import TabPanel from '~/components/atoms/TabPanel';
import QuestionBankInner from './QuestionBankInner';
import QuestionBankInnerCreate from './QuestionBankInnerCreate';
import QuestionBankInnerUpdate from './QuestionBankInnerUpdate';

export default function ResourceMentorQuestionBank() {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (_: any, newValue: number) => setTabValue(newValue);
  const tabEl = [
    {
      id: 0,
      text: 'Câu hỏi trong ngân hàng',
      component: <QuestionBankInner />,
    },
    { id: 1, text: 'Tạo mới', component: <QuestionBankInnerCreate /> },
    {
      id: 2,
      text: 'Tải lên',
      component: <QuestionBankInnerUpdate />,
    },
  ];
  return (
    <>
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
          <Box py={4}>{tab.component}</Box>
        </TabPanel>
      ))}
    </>
  );
}
