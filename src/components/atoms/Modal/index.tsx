import { Breakpoint, Dialog, DialogContent } from '@mui/material';

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
    <Dialog fullWidth maxWidth={maxWidth} onClose={onClose} open={open}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

CustomModal.defaultProps = {
  maxWidth: 'sm',
};
