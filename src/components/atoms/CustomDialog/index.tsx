import { Breakpoint, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { ReactElement } from 'react';

interface CustomDialogProps {
  title?: string | ReactElement;
  open: boolean;
  children: ReactElement;
  onClose: () => void;
  maxWidth?: false | Breakpoint;
}

export default function CustomDialog({
  title,
  open,
  children,
  onClose,
  maxWidth,
}: CustomDialogProps) {
  return (
    <Dialog
      fullWidth
      scroll="body"
      maxWidth={maxWidth}
      onClose={onClose}
      open={open}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

CustomDialog.defaultProps = {
  title: '',
  maxWidth: 'sm',
};
