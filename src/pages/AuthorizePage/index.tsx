import { Stack, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { SX_NOT_FOUND_STACK, SX_NOT_FOUND_TEXT } from './styles';

export default function AuthorizePage() {
  return <Navigate to="/login" />;
}
