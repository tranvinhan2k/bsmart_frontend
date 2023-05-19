import { Box, Divider, Stack, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Color } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Icon, { IconName } from '~/components/atoms/Icon';
import {
  MentorNavigationActionData,
  mockMentorLatestActivities,
} from '~/constants';
import { formateISODateStringToDisplayDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import { image } from '~/constants/image';
import { ProfileImgType } from '~/constants/profile';
import { ROLE_LABELS } from '~/constants/role';
import { RoleKeys } from '~/models/variables';
import { selectProfile } from '~/redux/user/selector';
import { formatDate } from '~/utils/date';
import toast from '~/utils/toast';
import RecentActivityList from '~/containers/MemberDetailsProfile/RecentActivityList';
import DialogUpdateAvatar from '~/components/molecules/Dialog/DialogEditAvatar';
import {
  SX_WRAPPER,
  SX_BOX_ITEM_AVATAR,
  SX_ACCOUNT_AVATAR,
  SX_ACCOUNT_NAME,
  SX_ACCOUNT_ROLE,
  SX_DISPLAY_FIELD_TEXT,
} from './style';

export default function MentorDetailSection() {
  const profile = useSelector(selectProfile);

  const mentorDetails = {
    imageLink:
      profile?.userImages?.find((img) => img?.type === ProfileImgType.AVATAR)
        ?.url || image.noAvatar,
    name: profile?.fullName,
    role: ROLE_LABELS[profile?.roles?.[0]?.code as RoleKeys],
    socials: [
      {
        image: 'facebook',
        link: profile?.facebookLink || null,
      },
      {
        image: 'twitter',
        link: profile?.twitterLink || null,
      },
      {
        image: 'instagram',
        link: profile?.instagramLink || null,
      },
    ],
    gender: profile?.gender || null,
    dateOfBirth: profile?.birthday,
    address: profile?.address || 'Chưa có thông tin',
    mail: profile?.email,
    phone: profile?.phone || 'Chưa có thông tin',
    walletMoney: profile?.wallet?.balance || 0,
  };

  const [openDialogUpdateAvatar, setOpenDialogUpdateAvatar] =
    useState<boolean>(false);
  const handleOpenDialogUpdateAvatar = () => setOpenDialogUpdateAvatar(true);
  const handleCloseDialogUpdateAvatar = () => setOpenDialogUpdateAvatar(false);

  const displayFields = [
    {
      image: 'mail',
      text: mentorDetails.mail,
    },
    {
      image: 'cake',
      text: formateISODateStringToDisplayDate(mentorDetails.dateOfBirth),
    },
    {
      image: 'phone',
      text: mentorDetails.phone,
    },
    {
      image: 'location',
      text: mentorDetails.address,
    },
  ];
  const activities = mockMentorLatestActivities;

  const navigate = useNavigate();
  function handleNavigateLink(link: string) {
    navigate(link);
  }

  const handleOpenSocialLink = (link: string | null) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      toast.notifyErrorToast('Không thể mở trang này.');
    }
  };

  return (
    <Stack>
      <Stack
        sx={{
          boxShadow: 3,
          padding: MetricSize.medium_15,
          borderRadius: '5px',
        }}
      >
        <Stack
          sx={{
            backgroundImage: `url(${overlay_bg})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            paddingX: MetricSize.medium_15,

            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              marginTop: { xs: MetricSize.medium_15, md: '100px' },
              width: '200px',
              height: '200px',
              borderRadius: '5px',
              objectFit: 'fill',
            }}
            component="img"
            alt="mentor avatar"
            src={mentorDetails.imageLink}
          />
          <Stack sx={{ alignItems: 'center' }} marginTop={2}>
            <Typography
              sx={{ fontFamily: FontFamily.bold, fontSize: FontSize.medium_24 }}
            >
              {mentorDetails.name}
            </Typography>
            <Typography
              sx={{
                color: Color.grey,
                fontFamily: FontFamily.regular,
                fontSize: FontSize.small_18,
              }}
            >
              {mentorDetails.role}
            </Typography>

            {mentorDetails.socials && (
              <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                {mentorDetails.socials.map((item) => (
                  <Stack m={1} key={item.image}>
                    <Tooltip title={item.link || 'Chưa có địa chỉ mạng xã hội'}>
                      <Button
                        onClick={() => handleOpenSocialLink(item.link)}
                        customVariant="normal"
                      >
                        <Icon name={item.image as IconName} size="small" />
                      </Button>
                    </Tooltip>
                  </Stack>
                ))}
              </Stack>
            )}

            {mentorDetails.gender && (
              <Icon
                color="orange"
                name={mentorDetails.gender as IconName}
                size="ex_large"
              />
            )}
            {mentorDetails.dateOfBirth && (
              <Typography
                sx={{
                  fontSize: FontSize.small_16,
                  color: Color.grey,
                  fontFamily: FontFamily.regular,
                }}
              >
                {formatDate(mentorDetails.dateOfBirth)}
              </Typography>
            )}
            {[
              {
                image: 'location',
                text: mentorDetails.address,
              },
              {
                image: 'mail',
                text: mentorDetails.mail,
              },
              {
                image: 'phone',
                text: mentorDetails.phone,
              },
            ].map((item) => (
              <Stack
                key={item.text}
                sx={{
                  marginTop: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Icon
                  name={item.image as IconName}
                  size="small"
                  color="orange"
                />
                <Typography
                  sx={{
                    fontSize: FontSize.small_16,
                    color: Color.grey,
                    fontFamily: FontFamily.regular,
                  }}
                >
                  {item.text}
                </Typography>
              </Stack>
            ))}
            {mentorDetails.walletMoney && (
              <Stack marginTop={1}>
                <Typography
                  sx={{
                    fontSize: FontSize.small_16,
                    color: Color.grey,
                    fontFamily: FontFamily.regular,
                  }}
                >
                  Số dư hiện tại:{' '}
                  <span style={{ color: Color.orange }}>
                    ${formatMoney(mentorDetails.walletMoney)}
                  </span>
                </Typography>
              </Stack>
            )}
          </Stack>
          <Stack sx={{ marginTop: 1, width: '100%' }}>
            {MentorNavigationActionData.map((item) => (
              <Button
                marginTop="small_10"
                key={item.link}
                onClick={() => handleNavigateLink(item.link)}
                customVariant="normal"
              >
                {item.name}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Stack>
      <DialogUpdateAvatar
        open={openDialogUpdateAvatar}
        handleOnClose={handleCloseDialogUpdateAvatar}
        profile={profile}
      />
    </>
  );
}
