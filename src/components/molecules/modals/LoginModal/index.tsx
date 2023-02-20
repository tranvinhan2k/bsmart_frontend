import { Box, IconButton, Modal, Stack, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { useState } from 'react';

import close from '~/assets/images/icons8_multiply_52px.png';

import { SX_MODAL_CONTAINER } from './styles';
import LoginForm from '~/components/molecules/FormComponent/LoginFormSection';
import { IconSize } from '~/assets/variables';

interface LoginModalProps {
  visible: boolean;
  onClick: () => void;
}

export default function LoginModal({ visible, onClick }: LoginModalProps) {
  return (
    <Modal
      open={visible}
      onClose={onClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={SX_MODAL_CONTAINER}>
        <Stack sx={{ width: '100%', alignItems: 'flex-end' }}>
          <IconButton onClick={onClick} sx={{ alignSelf: 'right' }}>
            <img
              src={close}
              alt="close button"
              style={{ width: IconSize.small, height: IconSize.small }}
            />
          </IconButton>
        </Stack>
        <LoginForm />
      </Box>
    </Modal>
  );
}
