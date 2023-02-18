import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Colors, IconSize } from '~/assets/variables';
import { IconName } from '~/models/icon';
import { ColorKeys, IconSizeKeys } from '~/models/variables';
import google from '~/assets/images/icons8_google_480px.png';

interface IconProps {
  color?: ColorKeys;
  size: IconSizeKeys;
  name: IconName;
}

export default function Icon({ color = 'black', name, size }: IconProps) {
  const STYLED_ICON: SxProps<Theme> = {
    width: IconSize[size],
    height: IconSize[size],
    color: Colors[color],
  };
  switch (name) {
    case 'google':
      return (
        <Box component="img" src={google} sx={STYLED_ICON} alt="google icon" />
      );
    case 'search':
      return <SearchIcon sx={STYLED_ICON} />;
    case 'down':
      return <ArrowDownwardIcon sx={STYLED_ICON} />;
    case 'up':
      return <ArrowUpwardIcon sx={STYLED_ICON} />;
    default:
      return <ImageNotSupportedIcon />;
  }
}

Icon.defaultProps = {
  color: Colors.black,
};
