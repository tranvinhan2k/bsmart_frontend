import { Stack, Grid } from '@mui/material';
import AdminDetailSection from '~/containers/AdminProfileLayoutSection/AdminDetailSection';
import AdminHeader from '~/components/molecules/AdminHeader';

interface AdminProfileLayoutProps {
  children: any;
}

export default function AdminProfileLayout({
  children,
}: AdminProfileLayoutProps) {
  return (
    <Stack
      sx={{
        height: '100vh',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: '',
      }}
    >
      <AdminDetailSection />
      <Stack
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'scroll',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <AdminHeader />
        <Stack>{children}</Stack>
      </Stack>
    </Stack>
  );
}
