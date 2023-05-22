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
import { useForm } from 'react-hook-form';
import CRUDTable from '~/components/molecules/CRUDTable';
import columns from '~/constants/columns';
import { useQueryGetAllCategories, useQueryGetAllSubjects } from '~/hooks';
import CustomModal from '~/components/atoms/Modal';
import ConfirmDialog from '~/components/atoms/ConfirmDialog';
import globalStyles from '~/styles';

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
  return { name, calories, fat, carbs, protein, numberOfQuestion: 5 };
}

export default function FeedbackManagerPage() {
  const { subjects } = useQueryGetAllSubjects();
  const { categories } = useQueryGetAllCategories();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearchValue = (data: string) => {
    console.log('search data', data);
  };

  const feedbackRows = [
    { id: 1, templateName: 'Đánh giá các môn Toán', numberOfQuestion: 5 },
    { id: 2, templateName: 'Đánh giá các môn Ngữ Văn', numberOfQuestion: 5 },
    { id: 3, templateName: 'Đánh giá các môn Tiếng Anh', numberOfQuestion: 5 },
    { id: 4, templateName: 'Đánh giá các môn Địa Lí', numberOfQuestion: 5 },
    { id: 5, templateName: 'Đánh giá các môn Sinh Học', numberOfQuestion: 5 },
    { id: 6, templateName: 'Đánh giá các môn GDCD', numberOfQuestion: 5 },
    { id: 7, templateName: 'Đánh giá các môn Tiếng Pháp', numberOfQuestion: 5 },
  ];
  const questionRows = [
    { id: 0, name: 'Câu hỏi về giáo viên 1' },
    { id: 1, name: 'Câu hỏi về giáo viên 2' },
    { id: 2, name: 'Câu hỏi về giáo viên 3' },
    { id: 3, name: 'Câu hỏi về giáo viên 4' },
  ];

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const template = {
    name: 'Đánh giá học sinh môn Toán',
    questions: [
      {
        id: 0,
        question: 'Con gà hay quả trứng có trước ?',
        answer: 'ai tới trc cũng được, nhưng mày không bao giờ tới trước',
      },
      {
        id: 0,
        question: 'Con gà hay quả trứng có trước ?',
        answer: 'ai tới trc cũng được, nhưng mày không bao giờ tới trước',
      },
    ],
  };

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
          addItemButtonLabel="Thêm bản mẫu"
          menuItemList={[
            {
              icon: 'search',
              title: 'Xem chi tiết bản mẫu',
              onCLick: () => {},
            },
            {
              icon: 'modeEdit',
              title: 'Cập nhật khoá học',
              onCLick: () => {},
            },
            {
              icon: 'delete',
              title: 'Xóa khoá học',
              onCLick: () => {},
            },
          ]}
          onAdd={() => {}}
          onSearch={handleSearchValue}
          searchFilterFormInputList={[
            {
              name: 'subject',
              placeholder: 'Môn học',
              variant: 'dropdown',
              data: subjects || [],
            },
            {
              name: 'category',
              placeholder: 'Ngôn ngữ',
              variant: 'dropdown',
              data: categories || [],
            },
          ]}
          searchPlaceholder="Tìm kiếm bản mẫu"
        />
        {/* <CustomModal open onClose={() => {}}>
          <Stack>
            <Typography sx={globalStyles.textSmallLabel}>
              Tên bản mẫu
            </Typography>
            <Typography sx={globalStyles.textSubTitle}>
              {template.name}
            </Typography>
          </Stack>
          <CRUDTable
            columns={columns.feedbackQuestionColumns}
            rows={questionRows}
            menuItemList={[
              {
                icon: 'search',
                title: 'Xem chi tiết câu hỏi',
                onCLick: () => {},
              },
            ]}
            onSearch={(data: any) => {}}
            searchFilterFormInputList={[
              {
                name: 'subject',
                placeholder: 'Thêm môn học mới',
                variant: 'dropdown',
                data: [{ id: 0, label: '', value: '', categoryId: 0 }],
              },
            ]}
          />
        </CustomModal> */}
        {/* <CustomModal open onClose={() => {}}>
          Hello World
        </CustomModal> */}
        {/* <ConfirmDialog open /> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <CRUDTable
          title="Quản lí câu hỏi"
          columns={columns.templateColumns}
          rows={feedbackRows}
        /> */}
      </TabPanel>
    </Stack>
  );
}
