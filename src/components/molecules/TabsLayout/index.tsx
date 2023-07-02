import React, { useState } from 'react';
import { Stack, Box, Tabs, Tab, Typography } from '@mui/material';

export interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export type TabPanelData = {
  label: string;
  renderItem: React.ReactNode;
}[];

interface TabsLayoutProps {
  data: TabPanelData;
}

export default function TabsLayout({ data }: TabsLayoutProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {data.map((item, index) => (
            <Tab key={item.label} label={item.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {data.map((item, index) => (
        <TabPanel key={item.label} value={value} index={index}>
          <Stack>{item.renderItem}</Stack>
        </TabPanel>
      ))}
    </Stack>
  );
}
