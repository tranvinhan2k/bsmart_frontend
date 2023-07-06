import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { image } from '~/constants/image';
import { mockMentorLatestActivities } from '~/constants';
import { ResponseProfilePayload } from '~/api/users';
import { ROLE_LABELS } from '~/constants/role';
import { RoleKeys } from '~/models/variables';
import toast from '~/utils/toast';

interface IntroduceAdminDetailSectionPayload {
  mentor: ResponseProfilePayload | undefined;
}

export default function IntroduceAdminDetailSection({
  mentor,
}: IntroduceAdminDetailSectionPayload) {
  const navigate = useNavigate();

  const profile = mentor;

  if (!mentor) return null;

  const mentorDetails = {
    imageLink: profile?.userImages?.[0]?.url || image.noAvatar,
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
    mail: profile?.email || 'Chưa có thông tin',
    phone: profile?.phone || 'Chưa có thông tin',
    walletMoney: profile?.wallet?.balance || 0,
  };
  const activities = mockMentorLatestActivities;

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
    <Sidebar>
      <Menu>
        <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <MenuItem> Documentation </MenuItem>
        <MenuItem> Calendar </MenuItem>
      </Menu>
    </Sidebar>
  );
}
