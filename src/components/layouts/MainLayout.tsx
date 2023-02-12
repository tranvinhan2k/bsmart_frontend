import { Stack } from '@mui/material';
import { MetricSize } from '~/assets/variables';

import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Navigation from '~/components/Navigation';
import { NavigationActionData } from '~/constants';

interface MainLayoutProps {
  children: any;
}
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Stack>
      <Stack sx={{ height: '80px' }}>
        <Header />
      </Stack>
      <Stack sx={{ height: '95px' }}>
        <Navigation pages={NavigationActionData} />
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
        <Footer />
      </Stack>
    </Stack>
  );
}
