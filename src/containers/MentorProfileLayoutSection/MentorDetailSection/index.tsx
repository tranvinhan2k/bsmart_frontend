import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MentorNavigationActionData } from '~/routes/navigators';
import toast from '~/utils/toast';

import ProfileSideBar from '~/components/molecules/ProfileSideBar';
import { selectProfile } from '~/redux/user/selector';
import { SocialPayload } from '~/models';
import { handleGetImageLink } from '~/utils/image';
import { NavigationLink } from '~/constants/routeLink';

export default function MentorDetailSection() {
  const navigate = useNavigate();
  const profile = useSelector(selectProfile);

  const [openDialogUpdateAvatar, setOpenDialogUpdateAvatar] =
    useState<boolean>(false);

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

  const imageLink = handleGetImageLink(profile.userImages, 'AVATAR');

  const handleOpenDialogUpdateAvatar = () =>
    setOpenDialogUpdateAvatar(!openDialogUpdateAvatar);

  const handleNavigateLink = (link: string) => {
    navigate(`/${NavigationLink.mentor_profile}/${link}`);
  };

  const handleOpenSocialLink = (link: string | null) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      toast.notifyErrorToast('Không thể mở trang này.');
    }
  };

  return (
    <ProfileSideBar
      avatarUrl={imageLink}
      birth={profile.birthday}
      email={profile.email}
      gender={profile.gender}
      isVerified={profile.isVerified}
      mail={profile.email}
      mentorProfileStatus={profile.mentorProfile.status}
      teachInformation={profile.teachInformation}
      name={profile.fullName}
      phone={profile.phone}
      role={profile.roles?.[0]?.code}
      socials={socials}
      openAvatar={openDialogUpdateAvatar}
      navigationData={MentorNavigationActionData}
      onNavigateLink={handleNavigateLink}
      onOpenLink={handleOpenSocialLink}
      onOpenUpdateAvatar={handleOpenDialogUpdateAvatar}
    />
  );
}
