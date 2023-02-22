import { Box, SxProps, Theme, Typography } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import {
  BsDribbble,
  BsInstagram,
  BsLinkedin,
  BsPinterest,
  BsTwitter,
  BsFacebook,
} from 'react-icons/bs';
import { FcNext } from 'react-icons/fc';
import { FaShare } from 'react-icons/fa';
import { CiMail, CiPhone } from 'react-icons/ci';
import { HiLocationMarker } from 'react-icons/hi';
import { AiOutlineClose, AiOutlineStar } from 'react-icons/ai';
import { GoPrimitiveDot } from 'react-icons/go';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { Color, IconSize } from '~/assets/variables';
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
    fontSize: IconSize[size],
    width: IconSize[size],
    height: IconSize[size],
    color: Color[color],
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
    case 'keyboardArrowRight':
      return <KeyboardArrowRightIcon sx={STYLED_ICON} />;
    case 'calendarMonth':
      return <CalendarMonthIcon sx={STYLED_ICON} />;
    case 'menu':
      return <MenuIcon sx={STYLED_ICON} />;
    case 'person':
      return <PersonIcon sx={STYLED_ICON} />;
    case 'twitter':
      return (
        <Typography sx={STYLED_ICON}>
          <BsTwitter />
        </Typography>
      );
    case 'instagram':
      return (
        <Typography sx={STYLED_ICON}>
          <BsInstagram />
        </Typography>
      );
    case 'linkedin':
      return (
        <Typography sx={STYLED_ICON}>
          <BsLinkedin />
        </Typography>
      );
    case 'pinterest':
      return (
        <Typography sx={STYLED_ICON}>
          <BsPinterest />
        </Typography>
      );
    case 'dribbble':
      return (
        <Typography sx={STYLED_ICON}>
          <BsDribbble />
        </Typography>
      );
    case 'mail':
      return (
        <Typography sx={STYLED_ICON}>
          <CiMail />
        </Typography>
      );
    case 'phone':
      return (
        <Typography sx={STYLED_ICON}>
          <CiPhone />
        </Typography>
      );
    case 'location':
      return (
        <Typography sx={STYLED_ICON}>
          <HiLocationMarker />
        </Typography>
      );
    case 'facebook':
      return (
        <Typography sx={STYLED_ICON}>
          <BsFacebook />
        </Typography>
      );
    case 'close':
      return (
        <Typography sx={STYLED_ICON}>
          <AiOutlineClose />
        </Typography>
      );
    case 'next':
      return (
        <Typography sx={STYLED_ICON}>
          <FcNext />
        </Typography>
      );
    case 'share':
      return (
        <Typography sx={STYLED_ICON}>
          <FaShare />
        </Typography>
      );
    case 'star':
      return (
        <Typography sx={STYLED_ICON}>
          <AiOutlineStar />
        </Typography>
      );
    case 'next2':
      return (
        <Typography sx={STYLED_ICON}>
          <GrNext />
        </Typography>
      );
    case 'previous':
      return (
        <Typography sx={STYLED_ICON}>
          <GrPrevious />
        </Typography>
      );
    case 'dot':
      return (
        <Typography sx={STYLED_ICON}>
          <GoPrimitiveDot />
        </Typography>
      );
    default:
      return <ImageNotSupportedIcon />;
  }
}

Icon.defaultProps = {
  color: Color.black,
};
