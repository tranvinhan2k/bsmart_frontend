import {
  AiOutlineClose,
  AiOutlineStar,
  AiFillSetting,
  AiOutlineInfoCircle,
  AiOutlineRedo,
  AiOutlineLogout,
} from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import {
  BsDribbble,
  BsInstagram,
  BsLinkedin,
  BsPinterest,
  BsTwitter,
  BsFacebook,
  BsQuestionSquare,
  BsPostcardFill,
  BsBook,
  BsFilter,
  BsArrowBarUp,
  BsCalendarDate,
  BsArrowReturnLeft,
  BsArrowBarDown,
  BsFillClipboard2CheckFill,
  BsCheckCircle,
  BsCheckCircleFill,
  BsXCircle,
  BsXCircleFill,
  BsFillInfoCircleFill,
  BsFillCaretRightFill,
} from 'react-icons/bs';
import { CiMail, CiPhone } from 'react-icons/ci';
import { FaShare } from 'react-icons/fa';
import { FcNext } from 'react-icons/fc';
import { GoPrimitiveDot } from 'react-icons/go';
import { GrNext, GrPrevious, GrFormPrevious } from 'react-icons/gr';
import { HiLocationMarker } from 'react-icons/hi';
import { IoMdPaper, IoMdPricetag } from 'react-icons/io';
import {
  MdPayments,
  MdCake,
  MdManageAccounts,
  MdFeedback,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdNumbers,
  MdNavigateNext,
} from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { VscTasklist } from 'react-icons/vsc';
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
import HomeIcon from '@mui/icons-material/Home';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ManIcon from '@mui/icons-material/Man';
import MenuIcon from '@mui/icons-material/Menu';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NavigateNext from '@mui/icons-material/NavigateNext';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import NearMeIcon from '@mui/icons-material/NearMe';
import PersonIcon from '@mui/icons-material/Person';
import QuizIcon from '@mui/icons-material/Quiz';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WomanIcon from '@mui/icons-material/Woman';
import GroupsIcon from '@mui/icons-material/Groups';
import DescriptionIcon from '@mui/icons-material/Description';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ClearIcon from '@mui/icons-material/Clear';
import UpdateIcon from '@mui/icons-material/Update';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import WarningIcon from '@mui/icons-material/Warning';
import ImageIcon from '@mui/icons-material/Image';
import { Box, SxProps, Theme, Typography } from '@mui/material';
import { Color, IconSize } from '~/assets/variables';
import { ColorKeys, IconSizeKeys } from '~/models/variables';
import google from '~/assets/images/icons8_google_480px.png';

export type IconName =
  | 'account'
  | 'attendance'
  | 'add-icon'
  | 'add'
  | 'assignment'
  | 'blog'
  | 'cake'
  | 'calendarMonth'
  | 'cart'
  | 'return'
  | 'category'
  | 'logOut'
  | 'blankSquareCheckbox'
  | 'number'
  | 'chat'
  | 'date'
  | 'check'
  | 'class'
  | 'close'
  | 'arrowUp'
  | 'info'
  | 'arrowDown'
  | 'arrowRight'
  | 'course'
  | 'viewDetail'
  | 'delete'
  | 'dot'
  | 'down'
  | 'checkCircle'
  | 'xCircle'
  | 'checkCircleFill'
  | 'xCircleFill'
  | 'dribbble'
  | 'edit'
  | 'eye-off'
  | 'eye'
  | 'facebook'
  | 'female'
  | 'feedback'
  | 'filter'
  | 'google'
  | 'home'
  | 'instagram'
  | 'keyboardArrowRight'
  | 'linkedin'
  | 'location'
  | 'squareCheckbox'
  | 'mail'
  | 'male'
  | 'menu'
  | 'modeEdit'
  | 'moreVert'
  | 'nearMe'
  | 'next'
  | 'next2'
  | 'payment'
  | 'book'
  | 'person'
  | 'phone'
  | 'pinterest'
  | 'previous'
  | 'question'
  | 'quiz'
  | 'right'
  | 'redo'
  | 'request'
  | 'left'
  | 'search'
  | 'setting'
  | 'share'
  | 'star'
  | 'subject'
  | 'teacher'
  | 'twitter'
  | 'up'
  | 'groups'
  | 'description'
  | 'coPresent'
  | 'dynamicFeed'
  | 'price'
  | 'clear'
  | 'update'
  | 'sentimentVeryDissatisfiedIcon'
  | 'warningIcon'
  | 'imageIcon'
  | 'user';
interface IconProps {
  color?: ColorKeys;
  size: IconSizeKeys;
  name: IconName | undefined;
}

export default function Icon({ color = 'black', name, size }: IconProps) {
  const STYLED_ICON: SxProps<Theme> = {
    fontSize: IconSize[size],
    width: IconSize[size],
    height: IconSize[size],
    color: Color[color],
  };
  switch (name) {
    case 'account':
      return (
        <Typography sx={STYLED_ICON}>
          <MdManageAccounts />
        </Typography>
      );
    case 'add-icon':
      return <AddPhotoAlternateIcon sx={STYLED_ICON} />;
    case 'add':
      return <AddIcon sx={STYLED_ICON} />;
    case 'assignment':
      return <AssignmentIcon sx={STYLED_ICON} />;
    case 'blog':
      return (
        <Typography sx={STYLED_ICON}>
          <BsPostcardFill />
        </Typography>
      );
    case 'price':
      return (
        <Typography sx={STYLED_ICON}>
          <IoMdPricetag />
        </Typography>
      );
    case 'info':
      return (
        <Typography sx={STYLED_ICON}>
          <AiOutlineInfoCircle />
        </Typography>
      );
    case 'date':
      return (
        <Typography sx={STYLED_ICON}>
          <BsCalendarDate />
        </Typography>
      );
    case 'logOut':
      return (
        <Typography sx={STYLED_ICON}>
          <AiOutlineLogout />
        </Typography>
      );
    case 'viewDetail':
      return (
        <Typography sx={STYLED_ICON}>
          <BsFillInfoCircleFill />
        </Typography>
      );
    case 'blankSquareCheckbox':
      return (
        <Typography sx={STYLED_ICON}>
          <MdCheckBoxOutlineBlank />
        </Typography>
      );
    case 'squareCheckbox':
      return (
        <Typography sx={STYLED_ICON}>
          <MdCheckBox />
        </Typography>
      );
    case 'book':
      return (
        <Typography sx={STYLED_ICON}>
          <BsBook />
        </Typography>
      );
    case 'attendance':
      return (
        <Typography sx={STYLED_ICON}>
          <BsFillClipboard2CheckFill />
        </Typography>
      );
    case 'number':
      return (
        <Typography sx={STYLED_ICON}>
          <MdNumbers />
        </Typography>
      );
    case 'cake':
      return (
        <Typography sx={STYLED_ICON}>
          <MdCake />
        </Typography>
      );
    case 'arrowUp':
      return (
        <Typography sx={STYLED_ICON}>
          <BsArrowBarUp />
        </Typography>
      );
    case 'return':
      return (
        <Typography sx={STYLED_ICON}>
          <BsArrowReturnLeft />
        </Typography>
      );
    case 'checkCircle':
      return (
        <Typography sx={STYLED_ICON}>
          <BsCheckCircle />
        </Typography>
      );
    case 'xCircle':
      return (
        <Typography sx={STYLED_ICON}>
          <BsXCircle />
        </Typography>
      );
    case 'checkCircleFill':
      return (
        <Typography sx={STYLED_ICON}>
          <BsCheckCircleFill />
        </Typography>
      );
    case 'xCircleFill':
      return (
        <Typography sx={STYLED_ICON}>
          <BsXCircleFill />
        </Typography>
      );
    case 'request':
      return (
        <Typography sx={STYLED_ICON}>
          <VscTasklist />
        </Typography>
      );
    case 'arrowDown':
      return (
        <Typography sx={STYLED_ICON}>
          <BsArrowBarDown />
        </Typography>
      );
    case 'arrowRight':
      return (
        <Typography sx={STYLED_ICON}>
          <BsFillCaretRightFill />
        </Typography>
      );
    case 'calendarMonth':
      return <CalendarMonthIcon sx={STYLED_ICON} />;
    case 'cart':
      return <ShoppingCartIcon sx={STYLED_ICON} />;
    case 'category':
      return (
        <Typography sx={STYLED_ICON}>
          <BiCategoryAlt />
        </Typography>
      );
    case 'chat':
      return <ChatIcon sx={STYLED_ICON} />;
    case 'check':
      return <CheckCircleIcon sx={STYLED_ICON} />;
    case 'class':
      return (
        <Typography sx={STYLED_ICON}>
          <SiGoogleclassroom />
        </Typography>
      );
    case 'close':
      return (
        <Typography sx={STYLED_ICON}>
          <AiOutlineClose />
        </Typography>
      );
    case 'course':
      return <ArticleIcon sx={STYLED_ICON} />;
    case 'delete':
      return <DeleteIcon sx={STYLED_ICON} />;
    case 'dot':
      return (
        <Typography sx={STYLED_ICON}>
          <GoPrimitiveDot />
        </Typography>
      );
    case 'down':
      return <ArrowDownwardIcon sx={STYLED_ICON} />;
    case 'dribbble':
      return (
        <Typography sx={STYLED_ICON}>
          <BsDribbble />
        </Typography>
      );
    case 'edit':
      return <EditIcon sx={STYLED_ICON} />;
    case 'eye-off':
      return <VisibilityOffIcon sx={STYLED_ICON} />;
    case 'eye':
      return <RemoveRedEyeIcon sx={STYLED_ICON} />;
    case 'facebook':
      return (
        <Typography sx={STYLED_ICON}>
          <BsFacebook />
        </Typography>
      );
    case 'feedback':
      return (
        <Typography sx={STYLED_ICON}>
          <MdFeedback />
        </Typography>
      );
    case 'filter':
      return (
        <Typography sx={STYLED_ICON}>
          <BsFilter />
        </Typography>
      );
    case 'female':
      return <WomanIcon sx={STYLED_ICON} />;
    case 'groups':
      return <GroupsIcon sx={STYLED_ICON} />;
    case 'description':
      return <DescriptionIcon sx={STYLED_ICON} />;
    case 'coPresent':
      return <CoPresentIcon sx={STYLED_ICON} />;
    case 'dynamicFeed':
      return <DynamicFeedIcon sx={STYLED_ICON} />;
    case 'clear':
      return <ClearIcon sx={STYLED_ICON} />;
    case 'update':
      return <UpdateIcon sx={STYLED_ICON} />;
    case 'sentimentVeryDissatisfiedIcon':
      return <SentimentVeryDissatisfiedIcon sx={STYLED_ICON} />;
    case 'warningIcon':
      return <WarningIcon sx={STYLED_ICON} />;
    case 'imageIcon':
      return <ImageIcon sx={STYLED_ICON} />;
    case 'google':
      return (
        <Box component="img" src={google} sx={STYLED_ICON} alt="google icon" />
      );
    case 'home':
      return <HomeIcon sx={STYLED_ICON} />;
    case 'instagram':
      return (
        <Typography sx={STYLED_ICON}>
          <BsInstagram />
        </Typography>
      );
    case 'keyboardArrowRight':
      return <KeyboardArrowRightIcon sx={STYLED_ICON} />;
    case 'linkedin':
      return (
        <Typography sx={STYLED_ICON}>
          <BsLinkedin />
        </Typography>
      );
    case 'location':
      return (
        <Typography sx={STYLED_ICON}>
          <HiLocationMarker />
        </Typography>
      );
    case 'mail':
      return (
        <Typography sx={STYLED_ICON}>
          <CiMail />
        </Typography>
      );
    case 'male':
      return <ManIcon sx={STYLED_ICON} />;
    case 'menu':
      return <MenuIcon sx={STYLED_ICON} />;
    case 'modeEdit':
      return <ModeEditIcon sx={STYLED_ICON} />;
    case 'moreVert':
      return <MoreVertIcon sx={STYLED_ICON} />;
    case 'nearMe':
      return <NearMeIcon sx={STYLED_ICON} />;
    case 'next':
      return (
        <Typography sx={STYLED_ICON}>
          <MdNavigateNext />
        </Typography>
      );
    case 'next2':
      return (
        <Typography sx={STYLED_ICON}>
          <GrNext />
        </Typography>
      );
    case 'payment':
      return (
        <Typography sx={STYLED_ICON}>
          <MdPayments />
        </Typography>
      );
    case 'person':
      return <PersonIcon sx={STYLED_ICON} />;
    case 'phone':
      return (
        <Typography sx={STYLED_ICON}>
          <CiPhone />
        </Typography>
      );
    case 'pinterest':
      return (
        <Typography sx={STYLED_ICON}>
          <BsPinterest />
        </Typography>
      );
    case 'previous':
      return (
        <Typography sx={STYLED_ICON}>
          <GrFormPrevious />
        </Typography>
      );
    case 'question':
      return (
        <Typography sx={STYLED_ICON}>
          <BsQuestionSquare />
        </Typography>
      );
    case 'redo':
      return (
        <Typography sx={STYLED_ICON}>
          <AiOutlineRedo />
        </Typography>
      );
    case 'quiz':
      return <QuizIcon sx={STYLED_ICON} />;
    case 'right':
      return <NavigateNext sx={STYLED_ICON} />;
    case 'left':
      return <NavigateBefore sx={STYLED_ICON} />;
    case 'search':
      return <SearchIcon sx={STYLED_ICON} />;
    case 'setting':
      return (
        <Typography sx={STYLED_ICON}>
          <AiFillSetting />
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
    case 'subject':
      return (
        <Typography sx={STYLED_ICON}>
          <IoMdPaper />
        </Typography>
      );
    case 'teacher':
      return <SwitchAccountIcon sx={STYLED_ICON} />;
    case 'twitter':
      return (
        <Typography sx={STYLED_ICON}>
          <BsTwitter />
        </Typography>
      );
    case 'up':
      return <ArrowUpwardIcon sx={STYLED_ICON} />;
    case 'user':
      return <AccountBoxIcon sx={STYLED_ICON} />;
    default:
      return <ImageNotSupportedIcon />;
  }
}

Icon.defaultProps = {
  color: Color.black,
};
