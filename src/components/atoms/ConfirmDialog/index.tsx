import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
} from '@mui/material';
import { FontFamily, FontSize } from '~/assets/variables';
import globalStyles from '~/styles';
import CustomModal from '../CustomModal';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  content: string;
  handleAccept: () => void;
  handleClose: () => void;
}
export default function ConfirmDialog({
  title,
  content,
  open,
  handleAccept,
  handleClose,
}: ConfirmDialogProps) {
  return (
    <CustomModal open={open} onClose={handleClose}>
      <Stack
        sx={{
          padding: 1,
          minWidth: { xs: '100%', md: '50vw' },
        }}
      >
        <Stack
          sx={{
            fontFamily: FontFamily.regular,
            fontSize: FontSize.small_18,
          }}
        >
          {title}
        </Stack>
        <Stack
          sx={{
            fontFamily: FontFamily.light,
            fontSize: FontSize.small_18,
            marginY: 2,
          }}
        >
          {content}
        </Stack>
        <Stack
          sx={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}
        >
          <Button variant="contained" onClick={handleAccept}>
            Xác Nhận
          </Button>
          <Button
            sx={{
              marginLeft: 1,
            }}
            color="error"
            variant="contained"
            onClick={handleClose}
            autoFocus
          >
            Hủy bỏ
          </Button>
        </Stack>
      </Stack>
    </CustomModal>
  );
}
