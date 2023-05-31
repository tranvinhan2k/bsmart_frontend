import { useProSidebar } from 'react-pro-sidebar';
import { Stack } from '@mui/material';
import Button from '~/components/atoms/Button';

export default function AdminPage() {
  const { collapseSidebar, toggleSidebar, toggled } = useProSidebar();

  const toggle = () => {
    toggleSidebar();
    if (!toggled) {
      collapseSidebar();
    }
  };

  return (
    <Stack>
      <Button
        onClick={() => {
          toggle();
        }}
      >
        Toggle
      </Button>
    </Stack>
  );
}
