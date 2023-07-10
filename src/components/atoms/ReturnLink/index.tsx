import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import globalStyles from '~/styles';
import Icon from '../Icon';

export default function ReturnLink() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
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
