import { Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { IconName } from '~/components/atoms/Icon';
import DashboardNavigationTabs from '~/components/atoms/tabs/DashboardNavigationTabs';

interface Props {
  navigationTabs: {
    id: number;
    link: string;
    name: string;
    icon: IconName;
    component: React.ReactNode;
    isHide?: boolean | undefined;
  }[];
}

export default function Sidebar({ navigationTabs }: Props) {
  const { pathname } = useLocation();
  return (
    <Stack sx={{ flexGrow: 1, marginRight: 2 }}>
      {navigationTabs.map((item) => (
        <DashboardNavigationTabs
          key={item.id}
          icon={item.icon}
          isActive={pathname.includes(item.link)}
          link={item.link}
          name={item.name}
        />
      ))}
    </Stack>
  );
}
