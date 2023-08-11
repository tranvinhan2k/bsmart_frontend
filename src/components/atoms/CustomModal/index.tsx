import {
  Box,
  Breakpoint,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';
import Icon from '../Icon';
import globalStyles from '~/styles';

interface CustomModalProps {
  open: boolean;
  children: any;
  onClose: () => void;
  maxWidth?: false | Breakpoint;
  title?: string;
}

export default function CustomModal({
  open,
  children,
  onClose,
  maxWidth,
  title,
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
          transition: 'all 500ms ease',
          maxHeight: '90vh',
          background: Color.white,
          borderRadius: { xs: '0', md: MetricSize.small_10 },
          padding: 4,
        }}
      >
        <Stack
          sx={{
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'space-between',
            minHeight: '30px',
          }}
        >
          <Typography sx={globalStyles.textTitle}>{title || ''}</Typography>
          <IconButton
            sx={{
              position: 'absolute',
              right: '-5px',
              width: '30px',
              height: '30px',
            }}
            onClick={onClose}
          >
            <Icon name="close" size="medium" color="black" />
          </IconButton>
        </Stack>
        <Stack
          sx={{
            transition: 'all 500ms ease',
            marginTop: 1,
            paddingRight: 1,
            paddingY: 1,
            maxHeight: '90vh',
            overflowY: 'auto',
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
