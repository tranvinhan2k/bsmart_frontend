import { Stack } from '@mui/material';
import { Colors } from '~/assets/variables';

import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Navigation from '~/components/Navigation';

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
        <Navigation />
      </Stack>
      <Stack
        sx={{
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
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
