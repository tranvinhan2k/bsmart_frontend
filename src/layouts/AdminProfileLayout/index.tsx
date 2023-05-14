import { Box, Grid, IconButton } from '@mui/material';
import { useProSidebar } from 'react-pro-sidebar';
import { ResponseProfilePayload } from '~/api/users';
import { SX_WRAPPER, SX_CONTAINER } from './style';
import AdminDetailSection from '~/containers/AdminProfileLayoutSection/AdminDetailSection';
import Icon from '~/components/atoms/Icon';
import { Color } from '~/assets/variables';

interface AdminProfileLayoutProps {
  children: any;
  isIntroduce?: boolean;
  mentor?: ResponseProfilePayload;
}

export default function AdminProfileLayout({
  children,
  isIntroduce = false,
  mentor,
}: AdminProfileLayoutProps) {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();
  return (
    <Box sx={SX_WRAPPER}>
      <Box sx={SX_CONTAINER}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={5}
        >
          <Grid item sm={12} md={4} lg={3}>
            <Box sx={{ display: 'block', width: '100%' }}>
              <AdminDetailSection />
            </Box>
          </Grid>
          <Grid item sm={12} md={8} lg={9}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

AdminProfileLayout.defaultProps = {
  isIntroduce: false,
  mentor: {},
};
