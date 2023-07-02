import { Chip } from '@mui/material';
import { ColorKeys } from '~/models/variables';

interface TagProps {
  title: string;
  color: ColorKeys;
  textColor?: ColorKeys;
}

export default function Tag({ color, textColor = 'black', title }: TagProps) {
  return (
    <Chip
      sx={{
        background: color,
        color: textColor,
      }}
      label={title}
    />
  );
}

Tag.defaultProps = {
  textColor: 'black',
};
