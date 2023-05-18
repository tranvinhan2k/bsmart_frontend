import { useState } from 'react';
import { Box, Tab, Tabs, Stack } from '@mui/material';
import { SX_REGISTER_TAB, SX_TAB, SX_TABS } from './styles';
import { TabPayload } from '~/models';
import TabPanel from '~/components/atoms/TabPanel';
import StudentRegisterForm from '~/components/molecules/FormComponent/StudentRegisterForm';
import MentorRegisterForm from '~/components/molecules/FormComponent/MentorRegisterForm';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface RegisterTabProps {
  registerTabs: TabPayload[];
}

export default function RegisterTab({ registerTabs }: RegisterTabProps) {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleChange = (event: any, value: number) => {
    setTabIndex(value);
  };

  return (
    <Stack sx={SX_REGISTER_TAB}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          sx={SX_TABS}
          value={tabIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          {registerTabs.map((item) => (
            <Tab
              sx={SX_TAB}
              key={item.index}
              label={item.label}
              {...a11yProps(item.index)}
            />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={registerTabs[0].index}>
        <Box sx={{ p: 3 }}>
          <StudentRegisterForm />
        </Box>
      </TabPanel>
      <TabPanel value={tabIndex} index={registerTabs[1].index}>
        <Box sx={{ p: 3 }}>
          <MentorRegisterForm />
        </Box>
      </TabPanel>
    </Stack>
  );
}
