import { Box, SxProps, Theme, Typography } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuIcon from '@mui/icons-material/Menu';
import NearMeIcon from '@mui/icons-material/NearMe';
import NavigateNext from '@mui/icons-material/NavigateNext';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  BsDribbble,
  BsInstagram,
  BsLinkedin,
  BsPinterest,
  BsTwitter,
  BsFacebook,
} from 'react-icons/bs';
import { FcNext } from 'react-icons/fc';
import { MdPayments } from 'react-icons/md';
import { FaShare } from 'react-icons/fa';
import { CiMail, CiPhone } from 'react-icons/ci';
import { HiLocationMarker } from 'react-icons/hi';
import { AiOutlineClose, AiOutlineStar } from 'react-icons/ai';
import { GoPrimitiveDot } from 'react-icons/go';
import { GrNext, GrPrevious } from 'react-icons/gr';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import ManIcon from '@mui/icons-material/Man';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WomanIcon from '@mui/icons-material/Woman';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArticleIcon from '@mui/icons-material/Article';
import { Color, IconSize } from '~/assets/variables';
import { ColorKeys, IconSizeKeys } from '~/models/variables';
import google from '~/assets/images/icons8_google_480px.png';

export type IconName =
  | 'google'
  | 'search'
  | 'course'
  | 'down'
  | 'up'
  | 'keyboardArrowRight'
  | 'calendarMonth'
  | 'menu'
  | 'nearMe'
  | 'person'
  | 'twitter'
  | 'instagram'
  | 'right'
  | 'linkedin'
  | 'dribbble'
  | 'mail'
  | 'phone'
  | 'add'
  | 'location'
  | 'delete'
  | 'user'
  | 'close'
  | 'check'
  | 'facebook'
  | 'next'
  | 'next2'
  | 'dot'
  | 'male'
  | 'female'
  | 'previous'
  | 'share'
  | 'edit'
  | 'cart'
  | 'eye'
  | 'eye-off'
  | 'add-icon'
  | 'star'
  | 'payment'
  | 'pinterest';
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
    case 'course':
      return <ArticleIcon sx={STYLED_ICON} />;
    case 'user':
      return <AccountBoxIcon sx={STYLED_ICON} />;
    case 'check':
      return <CheckCircleIcon sx={STYLED_ICON} />;
    case 'add':
      return <AddIcon sx={STYLED_ICON} />;
    case 'eye':
      return <RemoveRedEyeIcon sx={STYLED_ICON} />;
    case 'right':
      return <NavigateNext sx={STYLED_ICON} />;
    case 'delete':
      return <DeleteIcon sx={STYLED_ICON} />;
    case 'edit':
      return <EditIcon sx={STYLED_ICON} />;
    case 'cart':
      return <ShoppingCartIcon sx={STYLED_ICON} />;
    case 'eye-off':
      return <VisibilityOffIcon sx={STYLED_ICON} />;
    case 'add-icon':
      return <AddPhotoAlternateIcon sx={STYLED_ICON} />;
    case 'down':
      return <ArrowDownwardIcon sx={STYLED_ICON} />;
    case 'up':
      return <ArrowUpwardIcon sx={STYLED_ICON} />;
    case 'keyboardArrowRight':
      return <KeyboardArrowRightIcon sx={STYLED_ICON} />;
    case 'male':
      return <ManIcon sx={STYLED_ICON} />;
    case 'female':
      return <WomanIcon sx={STYLED_ICON} />;
    case 'calendarMonth':
      return <CalendarMonthIcon sx={STYLED_ICON} />;
    case 'menu':
      return <MenuIcon sx={STYLED_ICON} />;
    case 'nearMe':
      return <NearMeIcon sx={STYLED_ICON} />;
    case 'person':
      return <PersonIcon sx={STYLED_ICON} />;
    case 'twitter':
      return (
        <Typography sx={STYLED_ICON}>
          <BsTwitter />
        </Typography>
      );
    case 'payment':
      return (
        <Typography sx={STYLED_ICON}>
          <MdPayments />
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
