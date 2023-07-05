import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

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
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleAccept}>
          Xác Nhận
        </Button>
        <Button variant="outlined" onClick={handleClose} autoFocus>
          Hủy bỏ
        </Button>
      </DialogActions>
    </Dialog>
  );
}
