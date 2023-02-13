import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import close from '~/assets/images/icons8_multiply_52px.png';
import {
  Colors,
  Common,
  FontFamilies,
  FontSize,
  IconSize,
  MetricSize,
} from '~/assets/variables';
import { ActionPayload } from '~/models';

interface AuthorizationBarProps {
  loginData: ActionPayload;
  registerData: ActionPayload;
}

function AuthorizationBar({ loginData, registerData }: AuthorizationBarProps) {
  const [isVisibleModal, setVisibleModal] = useState<boolean>(false);

  const handleTriggerModal = () => {
    setVisibleModal(!isVisibleModal);
  };

  return (
    <>
      <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button
          style={{ padding: MetricSize.small, textDecoration: 'none' }}
          onClick={handleTriggerModal}
        >
          <Typography
            sx={{
              fontFamily: FontFamilies.regular,
              fontSize: FontSize.small,
              color: Colors.white,
              transitionDelay: '100ms',
              transitionProperty: 'color',
              '&:hover': {
                color: Colors.orange,
              },
            }}
          >
            {loginData.name}
          </Typography>
        </Button>
        <Typography>|</Typography>
        <Button
          key={registerData.name}
          style={{ padding: MetricSize.small, textDecoration: 'none' }}
        >
          <Typography
            sx={{
              fontFamily: FontFamilies.regular,
              fontSize: FontSize.small,
              color: Colors.white,
              transitionDelay: '100ms',
              transitionProperty: 'color',
              '&:hover': {
                color: Colors.orange,
              },
            }}
          >
            {registerData.name}
          </Typography>
        </Button>
      </Stack>
      <Modal
        open={isVisibleModal}
        onClose={handleTriggerModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            borderRadius: Common.borderRadius,
            background: Colors.white,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            padding: MetricSize.medium,
          }}
        >
          <Stack sx={{ width: '100%', alignItems: 'flex-end' }}>
            <IconButton
              onClick={handleTriggerModal}
              sx={{ alignSelf: 'right' }}
            >
              <img
                src={close}
                alt="close button"
                style={{ width: IconSize.small, height: IconSize.small }}
              />
            </IconButton>
          </Stack>
          <Typography
            sx={{
              fontFamily: FontFamilies.bold,
              fontSize: FontSize.medium,
              textAlign: 'center',
            }}
          >
            Đăng nhập
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default AuthorizationBar;
