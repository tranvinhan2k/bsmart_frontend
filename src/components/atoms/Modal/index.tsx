import { Modal, Stack, IconButton, Box } from '@mui/material';
import Icon from '../Icon';
import { Color, MetricSize } from '~/assets/variables';

interface CustomModalProps {
  open: boolean;
  children: any;
  onClose: () => void;
}

export default function CustomModal({
  open,
  children,
  onClose,
}: CustomModalProps) {
  return (
    <Modal
      sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
      open={open}
    >
      <Stack
        sx={{
          width: '80%',
          height: 'calc(100vh - 40px)',
          background: Color.white,
          borderRadius: MetricSize.small_10,
          padding: MetricSize.small_10,
        }}
      >
        <Box sx={{ alignSelf: 'flex-end' }}>
          <IconButton onClick={onClose}>
            <Icon name="close" size="small_20" color="black" />
          </IconButton>
        </Box>
        <Stack>{children}</Stack>
      </Stack>
    </Modal>
  );
}
