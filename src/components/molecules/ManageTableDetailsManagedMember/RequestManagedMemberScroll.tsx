import { Box, Divider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Color, FontFamily, FontSize } from '~/assets/variables';
import { SX_FORM_LABEL, SX_WRAPPER } from './style';

interface RequestManagedMemberScrollProps {
  scrollRequestBasicInfo: () => void;
  scrollRequestStudyingInfo: () => void;
}

export default function RequestManagedMemberScroll({
  scrollRequestBasicInfo,
  scrollRequestStudyingInfo,
}: RequestManagedMemberScrollProps) {
  const [navigationPartId, setNavigatePartId] = useState(0);

  const navigationButton: {
    id: number;
    name: string;
    onClick: () => void;
  }[] = [
    {
      id: 0,
      name: 'Thông tin cơ bản',
      onClick: scrollRequestBasicInfo,
    },
    {
      id: 1,
      name: 'Học tập',
      onClick: scrollRequestStudyingInfo,
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
