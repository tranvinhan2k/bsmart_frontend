import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon';

interface Props {
  to: string;
}

export default function ReturnLink({ to }: Props) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(to, { state: { id: 0, name: '/' } });
  };
  return (
    <Box sx={{ marginBottom: 1 }}>
      <Button
        onClick={handleGoBack}
        variant="text"
        startIcon={<Icon name="left" size="small" color="navy" />}
      >
        Trở lại
      </Button>
    </Box>
  );
}
