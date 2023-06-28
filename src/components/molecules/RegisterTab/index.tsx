import { useState } from 'react';
import { Box, Tab, Tabs, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SX_REGISTER_TAB, SX_TAB, SX_TABS } from './styles';
import { TabPayload } from '~/models';
import TabPanel from '~/components/atoms/TabPanel';
import StudentRegisterForm from '~/components/molecules/FormComponent/StudentRegisterForm';
import MentorRegisterForm from '~/components/molecules/FormComponent/MentorRegisterForm';
import globalStyles from '~/styles';
import CustomModal from '~/components/atoms/CustomModal';
import { image } from '~/constants/image';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface RegisterTabProps {
  registerTabs: TabPayload[];
}

export default function RegisterTab({ registerTabs }: RegisterTabProps) {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event: any, value: number) => {
    setTabIndex(value);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/login');
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Stack sx={SX_REGISTER_TAB}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          sx={SX_TABS}
          value={tabIndex}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          {registerTabs.map((item) => (
            <Tab
              sx={SX_TAB}
              key={item.index}
              label={item.label}
              {...a11yProps(item.index)}
            />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={registerTabs[0].index}>
        <Box sx={{ p: 3 }}>
          <StudentRegisterForm onOpen={handleOpen} />
        </Box>
      </TabPanel>
      <TabPanel value={tabIndex} index={registerTabs[1].index}>
        <Box sx={{ p: 3 }}>
          <MentorRegisterForm onOpen={handleOpen} />
        </Box>
      </TabPanel>
      <CustomModal open={open} onClose={handleClose}>
        <Stack
          padding={3}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={image.success}
            sx={{
              height: '400px',
              width: '400px',
              objectFit: 'contain',
            }}
          />
          <Typography sx={globalStyles.textSubTitle}>
            ĐĂNG KÍ THÀNH CÔNG
          </Typography>
          <Typography textAlign="center" sx={globalStyles.textSmallLight}>
            Bạn đã đăng kí tài khoản thành công ! Vui lòng đăng nhập và kiểm tra
            email xác thực đã được gửi đến địa chỉ mail của bạn.{' '}
          </Typography>
        </Stack>
      </CustomModal>
    </Stack>
  );
}
