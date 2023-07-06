import { Stack } from '@mui/material';
import { HighRoleSidebarWrapper } from '~/HOCs';
import { AdminNavigationActionData } from '~/routes/navigators';

interface AdminProfileLayoutProps {
  children: any;
}

export default function AdminProfileLayout({
  children,
}: AdminProfileLayoutProps) {
  return (
    <HighRoleSidebarWrapper actions={AdminNavigationActionData}>
      <Stack>{children}</Stack>
    </HighRoleSidebarWrapper>
  );
}
