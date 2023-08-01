import { Stack, Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontSize, FontFamily } from '~/assets/variables';
import ReturnLink from '~/components/atoms/ReturnLink';
import { image } from '~/constants/image';
import globalStyles from '~/styles';
import { formatError } from '~/utils/common';

interface Props {
  isEmptyCourse?: boolean;
  isLoading?: boolean;
  error?: any;
  children: React.ReactNode;
}

export default function LoadingWrapper({
  isEmptyCourse = false,
  isLoading,
  error,
  children,
}: Props) {
  const navigate = useNavigate();
  if (isLoading)
    return (
      <Stack
        sx={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <Stack
          sx={{
            paddingY: '50px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '50px',
              height: '50px',
              objectFit: 'contain',
            }}
            component="img"
            src={image.loadingIcon2}
            alt="no course"
          />
          <Typography sx={globalStyles.textLowSmallLight}>
            Đang tải dữ liệu...
          </Typography>
        </Stack>
      </Stack>
    );
  if (error)
    return (
      <Stack
        sx={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <Stack
          sx={{
            paddingY: '50px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '300px',
              height: '300px',
              objectFit: 'contain',
            }}
            component="img"
            src={image.error}
            alt="no course"
          />
          <Typography sx={globalStyles.textSmallLight}>
            {formatError(error.message)}
          </Typography>
          <ReturnLink />
        </Stack>
      </Stack>
    );
  if (isEmptyCourse)
    return (
      <Stack
        sx={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <Stack
          sx={{
            paddingY: '50px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '300px',
              height: '300px',
              objectFit: 'contain',
            }}
            component="img"
            src={image.emptyCourseList}
            alt="no course"
          />
          <Typography sx={globalStyles.textSmallLight}>
            Chưa có dữ liệu.
          </Typography>
        </Stack>
      </Stack>
    );
  return <Stack>{children}</Stack>;
}

LoadingWrapper.defaultProps = {
  isEmptyCourse: false,
};
