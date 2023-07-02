import { Box, Typography, AppBar, Tab, Tabs, useTheme } from '@mui/material';
import React from 'react';
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
  // params
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  // functions
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  // if list null
  if (tabContentList?.length === 0) {
    console.error('No items in list yet.');
    return null;
  }

  return (
    <Box
      sx={{
        background: Color.white,
        borderRadius: MetricSize.small_10,
        boxShadow: 2,
      }}
    >
      <AppBar
        sx={{
          borderTopLeftRadius: MetricSize.small_10,
          borderTopRightRadius: MetricSize.small_10,
        }}
        position="static"
      >
        <Tabs
          sx={{
            borderTopLeftRadius: MetricSize.small_10,
            borderTopRightRadius: MetricSize.small_10,
          }}
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {tabContentList.map((item, index) => (
            <Tab
              onClick={item.onClick}
              sx={{
                background: Color.orange,
              }}
              key={item.label}
              label={item.label}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
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
      </SwipeableViews>
    </Box>
  );
}
