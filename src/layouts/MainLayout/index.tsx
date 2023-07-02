import { Stack } from '@mui/material';
import BreadcrumbNavigationSection from '~/containers/MainLayout/BreadcrumbNavigationSection';
import MainFooterSection from '~/containers/MainLayout/MainFooterSection';
import MainHeaderSection from '~/containers/MainLayout/MainHeaderSection';
import MainNavigationSection from '~/containers/MainLayout/MainNavigationSection';

interface MainLayoutProps {
  children: any;
}
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Stack
      sx={{
        transition: 'all 1s ease',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Stack sx={{ height: { xs: 0, md: '70px' } }}>
        <MainHeaderSection />
      </Stack>
      <Stack
        sx={{
          height: '70px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <MainNavigationSection />
      </Stack>
      <Stack>
        <BreadcrumbNavigationSection />
      </Stack>
      {children}
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
