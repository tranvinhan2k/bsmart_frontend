import { Box, Breakpoint, IconButton, Modal, Stack } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';
import Icon from '../Icon';

interface CustomModalProps {
  open: boolean;
  children: any;
  onClose: () => void;
  maxWidth?: false | Breakpoint;
}

export default function CustomModal({
  open,
  children,
  onClose,
  maxWidth,
}: CustomModalProps) {
  return (
    <Modal
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
      open={open}
    >
      <Stack
        sx={{
          minWidth: { xs: '100%', md: '0' },
          minHeight: '100px',
          background: Color.white,
          borderRadius: { xs: '0', md: MetricSize.small_10 },
          padding: MetricSize.small_10,
        }}
      >
        <Box sx={{ alignSelf: 'flex-end' }}>
          <IconButton onClick={onClose}>
            <Icon name="close" size="small_20" color="black" />
          </IconButton>
        </Box>
        <Stack
          sx={{
            padding: 1,
            maxHeight: '90vh',
            overflowY: 'scroll',
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {children}
        </Stack>
      </Stack>
    </Modal>
  );
}

CustomModal.defaultProps = {
  maxWidth: 'sm',
};
