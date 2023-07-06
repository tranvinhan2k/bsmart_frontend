import { HighRoleSidebarWrapper } from '~/HOCs';
import { ManagerNavigationActionData } from '~/routes/navigators';

interface ManagerProfileLayoutProps {
  children: any;
}

export default function ManagerProfileLayout({
  children,
}: ManagerProfileLayoutProps) {
  return (
    <HighRoleSidebarWrapper actions={ManagerNavigationActionData}>
      {children}
    </HighRoleSidebarWrapper>
  );
}
