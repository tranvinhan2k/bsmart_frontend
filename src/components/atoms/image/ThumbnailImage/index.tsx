import { Box } from '@mui/material';
import { image } from '~/constants/image';

interface Props {
  url: string | undefined;
  alt: string | undefined;
}
export default function ThumbnailImage({ alt, url }: Props) {
  return (
    <Box
      loading="lazy"
      component="img"
      sx={{
        objectFit: 'cover',
        width: '100%',
        height: undefined,
        aspectRatio: 16 / 9,
        backgroundColor: '#0093E9',
        background: '#F5F5F5',
      }}
      src={url || image.noCourse}
      alt={alt}
    />
  );
}
