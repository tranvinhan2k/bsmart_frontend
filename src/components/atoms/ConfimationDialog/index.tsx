import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  content: string;
  agreeTitle?: string;
  cancelTitle?: string;
  onAgree: () => void;
  onClose: () => void;
}

export default function ConfirmationDialog({
  open,
  title,
  content,
  agreeTitle = 'Tiếp tục',
  cancelTitle = 'Hủy Bỏ',
  onAgree,
  onClose,
}: ConfirmationDialogProps) {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAgree}>{agreeTitle}</Button>
        <Button onClick={onClose}>{cancelTitle}</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.defaultProps = {
  agreeTitle: 'Tiếp tục',
  cancelTitle: 'Hủy Bỏ',
};
