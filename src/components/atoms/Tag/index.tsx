import { Chip } from '@mui/material';
import { ColorKeys } from '~/models/variables';

interface TagProps {
  title: string;
  color: ColorKeys;
}

export default function Tag({ color, title }: TagProps) {
  return (
    <Chip
      sx={{
        background: color,
      }}
      label={title}
    />
  );
}
