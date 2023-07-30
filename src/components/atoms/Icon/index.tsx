import {
  AiOutlineClose,
  AiOutlineStar,
  AiFillSetting,
  AiOutlineInfoCircle,
  AiOutlineRedo,
  AiOutlineLogout,
} from 'react-icons/ai';
import { BiCategoryAlt, BiDownload, BiTimeFive, BiMoney } from 'react-icons/bi';
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
import { FaBell, FaShare, FaMoneyBill } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';
import { GrNext, GrFormPrevious } from 'react-icons/gr';
import { HiLocationMarker, HiOutlineTicket } from 'react-icons/hi';
import { IoMdPaper, IoMdPricetag } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';
import {
  MdPayments,
  MdCake,
  MdManageAccounts,
  MdFeedback,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdPlayLesson,
  MdNumbers,
  MdNavigateNext,
  MdClass,
} from 'react-icons/md';
import { VscTasklist } from 'react-icons/vsc';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LanguageIcon from '@mui/icons-material/Language';
import ManIcon from '@mui/icons-material/Man';
import MenuIcon from '@mui/icons-material/Menu';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import NavigateNext from '@mui/icons-material/NavigateNext';
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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import UndoIcon from '@mui/icons-material/Undo';
import HelpIcon from '@mui/icons-material/Help';
import { Box, SxProps, Theme, Stack } from '@mui/material';
import { Color, IconSize } from '~/assets/variables';
import { ColorKeys, IconSizeKeys } from '~/models/variables';
import google from '~/assets/images/icons8_google_480px.png';

export type IconName =
  | 'account'
  | 'add-icon'
  | 'add'
  | 'arrowDown'
  | 'arrowRight'
  | 'arrowUp'
  | 'assignment'
  | 'attendance'
  | 'barChartIcon'
  | 'biMoney'
  | 'blankSquareCheckbox'
  | 'blog'
  | 'book'
  | 'cake'
  | 'calendarMonth'
  | 'cancelIcon'
  | 'cart'
  | 'time'
  | 'category'
  | 'chat'
  | 'check'
  | 'checkCircle'
  | 'bell'
  | 'checkCircleFill'
  | 'class'
  | 'clear'
  | 'promo'
  | 'close'
  | 'contentCopyIcon'
  | 'coPresent'
  | 'course'
  | 'date'
  | 'delete'
  | 'description'
  | 'dot'
  | 'down'
  | 'download'
  | 'dribbble'
  | 'dynamicFeed'
  | 'edit'
  | 'expandLessIcon'
  | 'expandMoreIcon'
  | 'eye-off'
  | 'eye'
  | 'facebook'
  | 'faMoneyBill'
  | 'feedback'
  | 'female'
  | 'filter'
  | 'google'
  | 'groups'
  | 'home'
  | 'helpIcon'
  | 'imageIcon'
  | 'info'
  | 'instagram'
  | 'keyboardArrowDownIcon'
  | 'keyboardArrowRightIcon'
  | 'keyboardArrowUpIcon'
  | 'languageIcon'
  | 'left'
  | 'lesson'
  | 'linkedin'
  | 'location'
  | 'logOut'
  | 'mail'
  | 'male'
  | 'menu'
  | 'modeEdit'
  | 'moreVert'
  | 'nearMe'
  | 'next'
  | 'next2'
  | 'number'
  | 'payment'
  | 'person'
  | 'phone'
  | 'pinterest'
  | 'previous'
  | 'price'
  | 'question'
  | 'quiz'
  | 'redo'
  | 'resource'
  | 'request'
  | 'return'
  | 'right'
  | 'search'
  | 'sentimentVeryDissatisfiedIcon'
  | 'sendIcon'
  | 'setting'
  | 'share'
  | 'squareCheckbox'
  | 'star'
  | 'subject'
  | 'teacher'
  | 'twitter'
  | 'up'
  | 'undoIcon'
  | 'update'
  | 'user'
  | 'viewDetail'
  | 'warningIcon'
  | 'xCircle'
  | 'xCircleFill';
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
        <Stack sx={STYLED_ICON}>
          <MdManageAccounts />
        </Stack>
      );
    case 'add-icon':
      return <AddPhotoAlternateIcon sx={STYLED_ICON} />;
    case 'add':
      return <AddIcon sx={STYLED_ICON} />;
    case 'assignment':
      return <AssignmentIcon sx={STYLED_ICON} />;
    case 'barChartIcon':
      return <BarChartIcon sx={STYLED_ICON} />;
    case 'blog':
      return (
        <Stack sx={STYLED_ICON}>
          <BsPostcardFill />
        </Stack>
      );
    case 'lesson':
      return (
        <Stack sx={STYLED_ICON}>
          <MdPlayLesson />
        </Stack>
      );
    case 'bell':
      return (
        <Stack sx={STYLED_ICON}>
          <FaBell />
        </Stack>
      );
    case 'download':
      return (
        <Stack sx={STYLED_ICON}>
          <BiDownload />
        </Stack>
      );
    case 'price':
      return (
        <Stack sx={STYLED_ICON}>
          <IoMdPricetag />
        </Stack>
      );
    case 'info':
      return (
        <Stack sx={STYLED_ICON}>
          <AiOutlineInfoCircle />
        </Stack>
      );
    case 'time':
      return (
        <Stack sx={STYLED_ICON}>
          <BiTimeFive />
        </Stack>
      );
    case 'biMoney':
      return (
        <Stack sx={STYLED_ICON}>
          <BiMoney />
        </Stack>
      );
    case 'date':
      return (
        <Stack sx={STYLED_ICON}>
          <BsCalendarDate />
        </Stack>
      );
    case 'resource':
      return (
        <Stack sx={STYLED_ICON}>
          <IoDocuments />
        </Stack>
      );
    case 'logOut':
      return (
        <Stack sx={STYLED_ICON}>
          <AiOutlineLogout />
        </Stack>
      );
    case 'viewDetail':
      return (
        <Stack sx={STYLED_ICON}>
          <BsFillInfoCircleFill />
        </Stack>
      );
    case 'blankSquareCheckbox':
      return (
        <Stack sx={STYLED_ICON}>
          <MdCheckBoxOutlineBlank />
        </Stack>
      );
    case 'squareCheckbox':
      return (
        <Stack sx={STYLED_ICON}>
          <MdCheckBox />
        </Stack>
      );
    case 'book':
      return (
        <Stack sx={STYLED_ICON}>
          <BsBook />
        </Stack>
      );
    case 'attendance':
      return (
        <Stack sx={STYLED_ICON}>
          <BsFillClipboard2CheckFill />
        </Stack>
      );
    case 'number':
      return (
        <Stack sx={STYLED_ICON}>
          <MdNumbers />
        </Stack>
      );
    case 'cake':
      return (
        <Stack sx={STYLED_ICON}>
          <MdCake />
        </Stack>
      );
    case 'arrowUp':
      return (
        <Stack sx={STYLED_ICON}>
          <BsArrowBarUp />
        </Stack>
      );
    case 'return':
      return (
        <Stack sx={STYLED_ICON}>
          <BsArrowReturnLeft />
        </Stack>
      );
    case 'promo':
      return (
        <Stack sx={STYLED_ICON}>
          <HiOutlineTicket />
        </Stack>
      );
    case 'checkCircle':
      return (
        <Stack sx={STYLED_ICON}>
          <BsCheckCircle />
        </Stack>
      );
    case 'xCircle':
      return (
        <Stack sx={STYLED_ICON}>
          <BsXCircle />
        </Stack>
      );
    case 'checkCircleFill':
      return (
        <Stack sx={STYLED_ICON}>
          <BsCheckCircleFill />
        </Stack>
      );
    case 'xCircleFill':
      return (
        <Stack sx={STYLED_ICON}>
          <BsXCircleFill />
        </Stack>
      );
    case 'request':
      return (
        <Stack sx={STYLED_ICON}>
          <VscTasklist />
        </Stack>
      );
    case 'arrowDown':
      return (
        <Stack sx={STYLED_ICON}>
          <BsArrowBarDown />
        </Stack>
      );
    case 'arrowRight':
      return (
        <Stack sx={STYLED_ICON}>
          <BsFillCaretRightFill />
        </Stack>
      );
    case 'calendarMonth':
      return <CalendarMonthIcon sx={STYLED_ICON} />;
    case 'cart':
      return <ShoppingCartIcon sx={STYLED_ICON} />;
    case 'category':
      return (
        <Stack sx={STYLED_ICON}>
          <BiCategoryAlt />
        </Stack>
      );
    case 'chat':
      return <ChatIcon sx={STYLED_ICON} />;
    case 'check':
      return <CheckCircleIcon sx={STYLED_ICON} />;
    case 'class':
      return (
        <Stack sx={STYLED_ICON}>
          <MdClass />
        </Stack>
      );
    case 'close':
      return (
        <Stack sx={STYLED_ICON}>
          <AiOutlineClose />
        </Stack>
      );
    case 'course':
      return <ArticleIcon sx={STYLED_ICON} />;
    case 'delete':
      return <DeleteIcon sx={STYLED_ICON} />;
    case 'dot':
      return (
        <Stack sx={STYLED_ICON}>
          <GoPrimitiveDot />
        </Stack>
      );
    case 'down':
      return <ArrowDownwardIcon sx={STYLED_ICON} />;
    case 'dribbble':
      return (
        <Stack sx={STYLED_ICON}>
          <BsDribbble />
        </Stack>
      );
    case 'edit':
      return <EditIcon sx={STYLED_ICON} />;
    case 'expandLessIcon':
      return <ExpandLessIcon sx={STYLED_ICON} />;
    case 'expandMoreIcon':
      return <ExpandMoreIcon sx={STYLED_ICON} />;
    case 'eye-off':
      return <VisibilityOffIcon sx={STYLED_ICON} />;
    case 'eye':
      return <RemoveRedEyeIcon sx={STYLED_ICON} />;
    case 'facebook':
      return (
        <Stack sx={STYLED_ICON}>
          <BsFacebook />
        </Stack>
      );
    case 'feedback':
      return (
        <Stack sx={STYLED_ICON}>
          <MdFeedback />
        </Stack>
      );
    case 'filter':
      return (
        <Stack sx={STYLED_ICON}>
          <BsFilter />
        </Stack>
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
    case 'contentCopyIcon':
      return <ContentCopyIcon sx={STYLED_ICON} />;
    case 'cancelIcon':
      return <CancelIcon sx={STYLED_ICON} />;
    case 'sendIcon':
      return <SendIcon sx={STYLED_ICON} />;
    case 'undoIcon':
      return <UndoIcon sx={STYLED_ICON} />;
    case 'helpIcon':
      return <HelpIcon sx={STYLED_ICON} />;
    case 'google':
      return (
        <Box component="img" src={google} sx={STYLED_ICON} alt="google icon" />
      );
    case 'home':
      return <HomeIcon sx={STYLED_ICON} />;
    case 'instagram':
      return (
        <Stack sx={STYLED_ICON}>
          <BsInstagram />
        </Stack>
      );
    case 'keyboardArrowDownIcon':
      return <KeyboardArrowDownIcon sx={STYLED_ICON} />;
    case 'keyboardArrowRightIcon':
      return <KeyboardArrowRightIcon sx={STYLED_ICON} />;
    case 'keyboardArrowUpIcon':
      return <KeyboardArrowUpIcon sx={STYLED_ICON} />;
    case 'linkedin':
      return (
        <Stack sx={STYLED_ICON}>
          <BsLinkedin />
        </Stack>
      );
    case 'location':
      return (
        <Stack sx={STYLED_ICON}>
          <HiLocationMarker />
        </Stack>
      );
    case 'mail':
      return (
        <Stack sx={STYLED_ICON}>
          <CiMail />
        </Stack>
      );
    case 'languageIcon':
      return <LanguageIcon sx={STYLED_ICON} />;
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
        <Stack sx={STYLED_ICON}>
          <MdNavigateNext />
        </Stack>
      );
    case 'next2':
      return (
        <Stack sx={STYLED_ICON}>
          <GrNext />
        </Stack>
      );
    case 'payment':
      return (
        <Stack sx={STYLED_ICON}>
          <MdPayments />
        </Stack>
      );
    case 'person':
      return <PersonIcon sx={STYLED_ICON} />;
    case 'phone':
      return (
        <Stack sx={STYLED_ICON}>
          <CiPhone />
        </Stack>
      );
    case 'pinterest':
      return (
        <Stack sx={STYLED_ICON}>
          <BsPinterest />
        </Stack>
      );
    case 'previous':
      return (
        <Stack sx={STYLED_ICON}>
          <GrFormPrevious />
        </Stack>
      );
    case 'question':
      return (
        <Stack sx={STYLED_ICON}>
          <BsQuestionSquare />
        </Stack>
      );
    case 'redo':
      return (
        <Stack sx={STYLED_ICON}>
          <AiOutlineRedo />
        </Stack>
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
        <Stack sx={STYLED_ICON}>
          <AiFillSetting />
        </Stack>
      );
    case 'share':
      return (
        <Stack sx={STYLED_ICON}>
          <FaShare />
        </Stack>
      );
    case 'faMoneyBill':
      return (
        <Stack sx={STYLED_ICON}>
          <FaMoneyBill />
        </Stack>
      );
    case 'star':
      return (
        <Stack sx={STYLED_ICON}>
          <AiOutlineStar />
        </Stack>
      );
    case 'subject':
      return (
        <Stack sx={STYLED_ICON}>
          <IoMdPaper />
        </Stack>
      );
    case 'teacher':
      return <SwitchAccountIcon sx={STYLED_ICON} />;
    case 'twitter':
      return (
        <Stack sx={STYLED_ICON}>
          <BsTwitter />
        </Stack>
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
