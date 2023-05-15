import { Box, SxProps, Theme, Typography } from '@mui/material';
import { AiOutlineClose, AiOutlineStar } from 'react-icons/ai';
import {
  BsDribbble,
  BsInstagram,
  BsLinkedin,
  BsPinterest,
  BsTwitter,
  BsFacebook,
} from 'react-icons/bs';
import { CiMail, CiPhone } from 'react-icons/ci';
import { FaShare } from 'react-icons/fa';
import { FcNext } from 'react-icons/fc';
import { GoPrimitiveDot } from 'react-icons/go';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { HiLocationMarker } from 'react-icons/hi';
import { MdPayments, MdCake } from 'react-icons/md';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ManIcon from '@mui/icons-material/Man';
import MenuIcon from '@mui/icons-material/Menu';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import NavigateNext from '@mui/icons-material/NavigateNext';
import NearMeIcon from '@mui/icons-material/NearMe';
import PersonIcon from '@mui/icons-material/Person';
import QuizIcon from '@mui/icons-material/Quiz';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WomanIcon from '@mui/icons-material/Woman';
import { Color, IconSize } from '~/assets/variables';
import { ColorKeys, IconSizeKeys } from '~/models/variables';
import google from '~/assets/images/icons8_google_480px.png';

export type IconName =
  | 'add-icon'
  | 'add'
  | 'assignment'
  | 'cake'
  | 'calendarMonth'
  | 'cart'
  | 'chat'
  | 'check'
  | 'close'
  | 'course'
  | 'delete'
  | 'dot'
  | 'down'
  | 'dribbble'
  | 'edit'
  | 'eye-off'
  | 'eye'
  | 'facebook'
  | 'female'
  | 'google'
  | 'instagram'
  | 'keyboardArrowRight'
  | 'linkedin'
  | 'location'
  | 'mail'
  | 'male'
  | 'menu'
  | 'modeEdit'
  | 'nearMe'
  | 'next'
  | 'next2'
  | 'payment'
  | 'person'
  | 'phone'
  | 'pinterest'
  | 'previous'
  | 'quiz'
  | 'right'
  | 'search'
  | 'share'
  | 'star'
  | 'twitter'
  | 'up'
  | 'user';
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
    case 'chat':
      return <ChatIcon sx={STYLED_ICON} />;
    case 'add':
      return <AddIcon sx={STYLED_ICON} />;
    case 'assignment':
      return <AssignmentIcon sx={STYLED_ICON} />;
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
    case 'modeEdit':
      return <ModeEditIcon sx={STYLED_ICON} />;
    case 'quiz':
      return <QuizIcon sx={STYLED_ICON} />;
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
    case 'cake':
      return (
        <Typography sx={STYLED_ICON}>
          <MdCake />
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
