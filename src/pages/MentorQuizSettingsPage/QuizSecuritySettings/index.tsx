import React from 'react';
import {
  Stack,
  Box,
  Button as MuiButton,
  Tabs,
  Tab,
  Typography,
} from '@mui/material';
import { FontFamily } from '~/assets/variables';
import { SX_FORM, SX_FORM_LABEL } from './style';

export default function QuizSecuritySettings() {
  const securityList = [
    {
      id: 1,
      title: 'Thay đổi hiển thị',
      desc: 'Bài quiz hiện đang ở chế độ riêng tư',
      buttonText: 'Đổi thành công khai',
      buttonOnClick: () => {
        console.log('Đổi thành công khai');
      },
    },
    {
      id: 2,
      title: 'Xóa bài quiz',
      desc: 'Sau khi chọn, bài quiz sẽ không quay trở lại. Hãy chắc chắn',
      buttonText: 'Xóa',
      buttonOnClick: () => {
        console.log('Xóa');
      },
    },
  ];

  return (
    <Box>
      {securityList.map((item) => (
        <Box sx={SX_FORM} key={item.id}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Box>
              <Typography sx={SX_FORM_LABEL}>{item.title}</Typography>
              <Typography>{item.desc}</Typography>
            </Box>
            <MuiButton
              color="miSmartOrange"
              size="large"
              variant="outlined"
              onClick={item.buttonOnClick}
              sx={{ fontFamily: FontFamily.bold }}
            >
              {item.buttonText}
            </MuiButton>
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
