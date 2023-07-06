import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { selectProfile } from '~/redux/user/selector';
import ProfileSideBar from '~/components/molecules/ProfileSideBar';
import { openUrl } from '~/utils/window';
import { SocialPayload } from '~/models';
import { handleGetImageLink } from '~/utils/image';
import {
  MemberNavigationActionData,
  NavigationActionData,
} from '~/routes/navigators';

export default function StudentSidebarProfile() {
  const profile = useSelector(selectProfile);

  const navigate = useNavigate();

  const [openDialogUpdateAvatar, setOpenDialogUpdateAvatar] =
    useState<boolean>(false);

  const imageLink = handleGetImageLink(profile.userImages, 'AVATAR');

  const socials: SocialPayload[] = [
    {
      name: 'Facebook',
      image: 'facebook',
      link: profile?.facebookLink || '',
    },
    {
      name: 'LinkedIn',
      image: 'linkedin',
      link: profile?.linkedinLink || '',
    },
  ];

  const handleNavigateLink = (link: string) => {
    navigate(`/${NavigationActionData[13].link}/${link}`);
  };

  const handleOpenDialogUpdateAvatar = () =>
    setOpenDialogUpdateAvatar(!openDialogUpdateAvatar);

  return (
    <ProfileSideBar
      avatarUrl={imageLink}
      birth={profile.birthday}
      gender={profile.gender}
      isVerified={profile.isVerified}
      mail={profile.email}
      name={profile.fullName}
      phone={profile.phone}
      role={profile.roles?.[0]?.code}
      socials={socials}
      openAvatar={openDialogUpdateAvatar}
      navigationData={MemberNavigationActionData}
      onNavigateLink={handleNavigateLink}
      onOpenLink={openUrl}
      onOpenUpdateAvatar={handleOpenDialogUpdateAvatar}
    />
  );
}
