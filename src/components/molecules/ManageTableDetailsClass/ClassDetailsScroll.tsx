import { Box, Divider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import { SX_FORM_LABEL, SX_WRAPPER } from './style';

interface ClassDetailsScrollProps {
  scrollBasicInfo: () => void;
  scrollMentor: () => void;
  scrollCourse: () => void;
  scrollTimeInWeek: () => void;
  scrollStudentList: () => void;
}

export default function ClassDetailsScroll({
  scrollBasicInfo,
  scrollMentor,
  scrollCourse,
  scrollTimeInWeek,
  scrollStudentList,
}: ClassDetailsScrollProps) {
  const [navigationPartId, setNavigatePartId] = useState(0);

  const navigationButton: {
    id: number;
    name: string;
    onClick: () => void;
  }[] = [
    {
      id: 1,
      name: 'Thông tin cơ bản',
      onClick: scrollBasicInfo,
    },
    {
      id: 2,
      name: 'Giảng viên',
      onClick: scrollMentor,
    },
    {
      id: 3,
      name: 'Khóa học',
      onClick: scrollCourse,
    },
    {
      id: 4,
      name: 'Thời gian biểu',
      onClick: scrollTimeInWeek,
    },
    {
      id: 5,
      name: 'Danh sách học sinh',
      onClick: scrollStudentList,
    },
  ];

  return (
    <Box sx={SX_WRAPPER}>
      <Box m={2} pl={1}>
        <Typography sx={SX_FORM_LABEL}>Mục lục</Typography>
      </Box>
      <Divider />
      <Stack marginTop={1} py={2}>
        {navigationButton.map((item) => (
          <Stack
            onClick={() => {
              item.onClick();
              setNavigatePartId(item.id);
            }}
            key={item.id}
            sx={{
              background: navigationPartId === item.id ? '#ddd' : Color.white,
              transition: 'all 1s ease',
              fontSize: FontSize.small_14,
              fontFamily: FontFamily.regular,
              padding: 1,
              marginX: 3,
              color: Color.black,

              ':hover': {
                background: Color.grey3,
                cursor: 'pointer',
                color: Color.black,
              },
            }}
          >
            {item.name.toUpperCase()}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
