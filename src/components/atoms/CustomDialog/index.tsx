import { Breakpoint, Dialog, DialogContent } from '@mui/material';

interface CustomDialogProps {
  open: boolean;
  children: any;
  onClose: () => void;
  maxWidth?: false | Breakpoint;
}

export default function CustomDialog({
  open,
  children,
  onClose,
  maxWidth,
}: CustomDialogProps) {
  return (
    <Dialog fullWidth maxWidth={maxWidth} onClose={onClose} open={open}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

CustomDialog.defaultProps = {
  maxWidth: 'sm',
};
