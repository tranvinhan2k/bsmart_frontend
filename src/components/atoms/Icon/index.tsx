import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { Colors, IconSize, MetricSize } from '~/assets/variables';
import { IconName } from '~/models/icon';
import { ColorKeys, IconSizeKeys } from '~/models/variables';
import google from '~/assets/images/icons8_google_480px.png';

interface IconProps {
  color?: ColorKeys;
  size: IconSizeKeys;
  name: IconName;
}

export default function Icon({ color, name, size }: IconProps) {
  const STYLED_ICON: SxProps<Theme> = {
    width: IconSize[size],
    height: IconSize[size],
  };
  switch (name) {
    case 'google':
      return (
        <Box component="img" src={google} sx={STYLED_ICON} alt="google icon" />
      );

    default:
      return <ImageNotSupportedIcon />;
  }
}

Icon.defaultProps = {
  color: Colors.black,
};
