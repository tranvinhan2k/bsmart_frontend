import { Box, Divider, Stack, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import overlay_bg from '~/assets/images/overlay-bg.jpg';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
import Icon, { IconName } from '~/components/atoms/Icon';
import {
  AdminNavigationActionData,
  mockMentorLatestActivities,
} from '~/constants';
import { image } from '~/constants/image';
import { ROLE_LABELS } from '~/constants/role';
import { RoleKeys } from '~/models/variables';
import { selectProfile } from '~/redux/user/selector';
import { formatDate } from '~/utils/date';
import { formatMoney } from '~/utils/money';
import toast from '~/utils/toast';

export default function AdminDetailSection() {
  const profile = useSelector(selectProfile);

  const navigate = useNavigate();
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
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: Color.whiteSmoke,
        width: '100%',
      }}
    >
      <Sidebar style={{ width: '100%' }}>
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? '#f5d9ff' : '#d359ff',
                  backgroundColor: active ? '#eecef9' : undefined,
                };
            },
          }}
        >
          <MenuItem> Quản lí tài khoản </MenuItem>
          <MenuItem> Quản lí khóa học </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
