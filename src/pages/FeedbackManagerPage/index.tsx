import React from 'react';
import {
  Stack,
  Box,
  Tabs,
  Tab,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import CRUDTable from '~/components/molecules/CRUDTable';
import columns from '~/constants/columns';

interface TabPanelProps {
  children?: React.ReactNode;
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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

export default function FeedbackManagerPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const feedbackRows = [
    { id: 1, templateName: 'Đánh giá các môn Toán' },
    { id: 2, templateName: 'Đánh giá các môn Ngữ Văn' },
    { id: 3, templateName: 'Đánh giá các môn Tiếng Anh' },
    { id: 4, templateName: 'Đánh giá các môn Địa Lí' },
    { id: 5, templateName: 'Đánh giá các môn Sinh Học' },
    { id: 6, templateName: 'Đánh giá các môn GDCD' },
    { id: 7, templateName: 'Đánh giá các môn Tiếng Pháp' },
  ];

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <Stack padding={3}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Bản mẫu" {...a11yProps(0)} />
          <Tab label="Câu hỏi" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CRUDTable
          title="Quản lí bản mẫu"
          columns={columns.templateColumns}
          rows={feedbackRows}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CRUDTable
          title="Quản lí câu hỏi"
          columns={columns.templateColumns}
          rows={feedbackRows}
        />
      </TabPanel>
    </Stack>
  );
}
