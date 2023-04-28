import { Box, Tab, Tabs, Stack } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import ResourceEditMode from './ResourceEditMode';
import ResourceMentorMain from '~/components/molecules/ResourceManagement/ResourceMentorMain';
import ResourceMentorQuestionBank from '~/components/molecules/ResourceManagement/ResourceMentorQuestionBank';
import TabPanel from '~/components/atoms/TabPanel/index';
import { scrollToTop } from '~/utils/common';

export default function MentorResourceManagePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (_: any, newValue: number) => setTabValue(newValue);

  const [editMode, setEditMode] = useState(false);
  const handleSetEditMode = (event: ChangeEvent<HTMLInputElement>) => {
    setEditMode(event.target.checked);
  };

  const tabEl = [
    {
      id: 0,
      text: 'Tài nguyên',
      component: <ResourceMentorMain editMode={editMode} />,
    },
    {
      id: 1,
      text: 'Ngân hàng câu hỏi',
      component: <ResourceMentorQuestionBank />,
    },
  ];

  return (
    <Box pt={2} pr={15} pl={15}>
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
        <ResourceEditMode
          editMode={editMode}
          handleSetEditMode={handleSetEditMode}
        />
      </Stack>
      {tabEl.map((tab) => (
        <TabPanel value={tabValue} index={tab.id} key={tab.id}>
          <Box py={2}>{tab.component}</Box>
        </TabPanel>
      ))}
    </Box>
  );
}
