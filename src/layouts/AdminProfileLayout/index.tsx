import { Stack, Grid } from '@mui/material';
import AdminDetailSection from '~/containers/AdminProfileLayoutSection/AdminDetailSection';
import AdminHeader from '~/components/molecules/AdminHeader';
import { Color } from '~/assets/variables';

interface AdminProfileLayoutProps {
  children: any;
}

export default function AdminProfileLayout({
  children,
}: AdminProfileLayoutProps) {
  return (
    <Grid container sx={{ height: '100vh', overflow: 'auto' }}>
      <Grid item xs={12} md={2}>
        <AdminDetailSection />
      </Grid>
      <Grid item xs={12} md={10}>
        <AdminHeader />
        <Stack>{children}</Stack>
      </Grid>
    </Grid>
  );
}
