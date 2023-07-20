import { Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DashboardNavigationTabs from '~/components/atoms/tabs/DashboardNavigationTabs';
import { MemberClassNavigationActionData } from '~/routes/member/class/navigation';

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <Stack sx={{ flexGrow: 1, marginRight: 2 }}>
      {MemberClassNavigationActionData.map((item) => (
        <DashboardNavigationTabs
          key={item.id}
          icon={item.icon || 'course'}
          isActive={pathname.includes(item.link)}
          link={item.link}
          name={item.name}
        />
      ))}
    </Stack>
  );
}
