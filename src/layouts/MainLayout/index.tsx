import { Stack } from '@mui/material';
import { MetricSize } from '~/assets/variables';

import BreadcrumbNavigationSection from '~/containers/MainLayout/BreadcrumbNavigationSection';
import MainFooterSection from '~/containers/MainLayout/MainFooterSection';
import MainHeaderSection from '~/containers/MainLayout/MainHeaderSection';
import MainNavigationSection from '~/containers/MainLayout/MainNavigationSection';

interface MainLayoutProps {
  children: any;
}
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Stack>
      <Stack sx={{ height: { xs: 0, md: '80px' } }}>
        <MainHeaderSection />
      </Stack>
      <Stack
        sx={{
          height: '95px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <MainNavigationSection />
      </Stack>
      <Stack sx={{ maxHeight: '750px' }}>
        <BreadcrumbNavigationSection />
      </Stack>
      <Stack
        sx={{
          minHeight: '100vh',
          paddingX: MetricSize.extraLarge,
        }}
      >
        {children}
      </Stack>
      <Stack
        sx={{
          minHeight: '20vh',
        }}
      >
        <MainFooterSection />
      </Stack>
    </Stack>
  );
}
