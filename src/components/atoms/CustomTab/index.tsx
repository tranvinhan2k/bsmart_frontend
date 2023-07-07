import { Box, Typography, AppBar, Tab, Tabs, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Color, MetricSize } from '~/assets/variables';

// types
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}
interface CustomTabProps {
  tabContentList: {
    label: string;
    data: React.ReactNode;
    onClick?: () => void;
  }[];
}

// component
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ paddingY: 2 }}>{children}</Box>}
    </div>
  );
}
TabPanel.defaultProps = {
  children: null,
  dir: '',
};

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function CustomTab({ tabContentList = [] }: CustomTabProps) {
  const [value, setValue] = useState(0);
  // params
  const theme = useTheme();

  // functions
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // if list null
  if (tabContentList?.length === 0) {
    console.error('No items in list yet.');
    return null;
  }

  return (
    <Box>
      <Tabs
        sx={{
          boxShadow: 0,
          borderBottom: '0.5px solid #ddd',
        }}
        value={value}
        onChange={handleChange}
      >
        {tabContentList.map((item, index) => (
          <Tab
            onClick={item.onClick}
            key={item.label}
            label={item.label}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {tabContentList.map((item, index) => (
        <TabPanel
          key={item.label}
          value={value}
          index={index}
          dir={theme.direction}
        >
          {item.data}
        </TabPanel>
      ))}
    </Box>
  );
}
