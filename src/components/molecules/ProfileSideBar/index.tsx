import {
  Stack,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  SX_WRAPPER,
  SX_BOX_ITEM_AVATAR,
  SX_ACCOUNT_AVATAR,
  SX_ACCOUNT_NAME,
  SX_ACCOUNT_EMAIL,
  SX_DISPLAY_FIELD_TEXT,
} from './style';
import Icon, { IconName } from '~/components/atoms/Icon';
import ActivityHistoryTopFive from '~/containers/AnnotationSection/ActivityHistoryTopFive';
import DialogUpdateAvatar from '../Dialog/DialogEditAvatar';
import SidebarNavigationButton from '../SidebarNavigationButton';
import { GenderKeys, RoleKeys } from '~/models/variables';
import { ActionPayload, SocialPayload } from '~/models';
import Button from '~/components/atoms/Button';
import { MetricSize } from '~/assets/variables';
import { NavigationLink } from '~/constants/routeLink';
import { MentorProfileStatus, MentorTeachingInformation } from '~/models/type';
import MentorProfileCompleteProgress from '../MentorProfileCompleteProgress';
import MentorProfileStatusProfileSideBar from '../MentorProfileStatusProfileSideBar';
import CoinLabel from '~/components/atoms/CoinLabel';

export interface ProfileSideBarProps {
  name: string;
  email: string;
  role: RoleKeys;
  avatarUrl: string;
  gender: GenderKeys;
  mail: string;
  coin: number;
  birth: string;
  phone: string;
  isVerified: boolean;
  mentorProfileStatus?: MentorProfileStatus;
  openAvatar: boolean;
  socials: SocialPayload[];
  navigationData: ActionPayload[];
  onOpenUpdateAvatar: () => void;
  onOpenLink: (link: string) => void;
  onNavigateLink: (link: string) => void;
  teachInformation?: MentorTeachingInformation;
}

export default function ProfileSideBar({
  name,
  email,
  role,
  avatarUrl,
  gender,
  birth,
  mail,
  phone,
  coin,
  openAvatar,
  isVerified,
  mentorProfileStatus,
  socials,
  navigationData,
  onOpenUpdateAvatar,
  onOpenLink,
  onNavigateLink,
  teachInformation,
}: ProfileSideBarProps) {
  const navigate = useNavigate();

  const displayFieldsMentor = {
    items: [
      {
        id: 0,
        image: 'coPresent',
        number: teachInformation?.numberOfCourse ?? 0,
        text: 'Khóa học',
      },
      {
        id: 1,
        image: 'coPresent',
        number: teachInformation?.numberOfClass ?? 0,
        text: 'Lớp học',
      },
      {
        id: 2,
        image: 'person',
        number: teachInformation?.numberOfMember ?? 0,
        text: 'Học sinh',
      },
    ],
    ratingDisplay: `${teachInformation?.scoreFeedback ?? 0} / 5`,
    noOfRatingDisplay: `(${teachInformation?.numberOfFeedBack} đánh giá)`,
  };

  const noOfRating = 482;
  const displayFieldsMember = {
    items: [
      {
        id: 0,
        image: 'coPresent',
        text1: 'Tham gia',
        number: 16,
        text2: 'Khóa học',
      },
      {
        id: 1,
        image: 'coPresent',
        text1: 'Tham gia',
        number: 172,
        text2: 'Lớp học',
      },
      {
        id: 2,
        image: 'edit',
        text1: 'Đã viết',
        number: 172,
        text2: 'Đánh giá đã viết',
      },
    ],
    ratingDisplay: {
      value: `${noOfRating}`,
      text: 'đánh giá đã viết',
    },
  };
  const handleNavigateDashboard = () =>
    navigate(`/${NavigationLink.dashboard}`);

  return (
    <>
      <Stack>
        <Box sx={SX_WRAPPER}>
          <Box sx={SX_BOX_ITEM_AVATAR}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              spacing={3}
            >
              <Box pt={{ sm: 5, md: 5, lg: 8, xl: 14 }}>
                <IconButton onClick={onOpenUpdateAvatar}>
                  <Tooltip title="Cập nhật" arrow placement="top">
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <Avatar
                        alt="Avatar"
                        src={avatarUrl}
                        sx={SX_ACCOUNT_AVATAR}
                      />
                    </Stack>
                  </Tooltip>
                </IconButton>
              </Box>
            </Stack>

            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
              mt={2}
            >
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography component="h4" sx={SX_ACCOUNT_NAME}>
                  {name}
                </Typography>
                <Typography component="h4" sx={SX_ACCOUNT_EMAIL}>
                  {email}
                </Typography>
                <CoinLabel value={coin} />
                {/* <Typography component="p" sx={SX_ACCOUNT_ROLE}>
                  {ROLE_LABELS[role]}
                </Typography> */}
              </Stack>
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                {role === 'TEACHER' && (
                  <>
                    {displayFieldsMentor.items.map((item) => {
                      return (
                        <Stack
                          key={item.id}
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          spacing={1}
                          mt={2}
                        >
                          <Icon
                            name={item.image as IconName}
                            size="small"
                            color="tertiary"
                          />
                          <Typography
                            textAlign="center"
                            sx={SX_DISPLAY_FIELD_TEXT}
                          >
                            <b>{item.number}</b> {item.text}
                          </Typography>
                        </Stack>
                      );
                    })}
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={1}
                      mt={2}
                    >
                      <Icon name="star" size="small" color="tertiary" />
                      <Typography textAlign="center" sx={SX_DISPLAY_FIELD_TEXT}>
                        <b>{displayFieldsMentor.ratingDisplay}</b>{' '}
                        {displayFieldsMentor.noOfRatingDisplay}
                      </Typography>
                    </Stack>
                    <MentorProfileStatusProfileSideBar
                      status={mentorProfileStatus}
                    />
                    <Box mt={2}>
                      <MentorProfileCompleteProgress />
                    </Box>
                  </>
                )}
                {role === 'STUDENT' && (
                  <>
                    {displayFieldsMember.items.map((item) => {
                      return (
                        <Stack
                          key={item.id}
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          spacing={1}
                          mb={2}
                        >
                          <Icon
                            name={item.image as IconName}
                            size="small"
                            color="tertiary"
                          />
                          <Typography
                            textAlign="center"
                            sx={SX_DISPLAY_FIELD_TEXT}
                          >
                            {/* {item.text1} <b>{item.number}</b> {item.text2} */}
                            <b>{item.number}</b> {item.text2}
                          </Typography>
                        </Stack>
                      );
                    })}
                  </>
                )}
              </Stack>
            </Stack>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={1}
              mt={3}
              sx={{ width: '100%' }}
            >
              {isVerified &&
                navigationData.map((item) => (
                  <SidebarNavigationButton
                    key={item.id}
                    item={item}
                    onNavigateLink={onNavigateLink}
                  />
                ))}
              <Button onClick={handleNavigateDashboard} customVariant="linear">
                <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Stack
                    sx={{ position: 'absolute', left: MetricSize.medium_15 }}
                  >
                    <Icon name="book" size="medium" color="white" />
                  </Stack>
                  {role === 'TEACHER' ? 'Quản lí giảng dạy' : 'Quản lí học tập'}
                </Stack>
              </Button>
            </Stack>
          </Box>
        </Box>
        <ActivityHistoryTopFive />
      </Stack>
      <DialogUpdateAvatar
        open={openAvatar}
        handleOnClose={onOpenUpdateAvatar}
      />
    </>
  );
}
