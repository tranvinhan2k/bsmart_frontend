import { Stack, Grid } from '@mui/material';
import ManagerDetailSection from '~/containers/ManagerProfileLayoutSection/ManagerDetailSection';
import ManagerHeader from '~/components/molecules/ManagerHeader';

interface ManagerProfileLayoutProps {
  children: any;
}

export default function ManagerProfileLayout({
  children,
}: ManagerProfileLayoutProps) {
  return (
    <Grid container>
      <Grid item xs={2} md={2}>
        <ManagerDetailSection />
      </Grid>
      <Grid item xs={10} md={10}>
        <ManagerHeader />
        <Stack>{children}</Stack>
      </Grid>
    </Grid>
  );
}
