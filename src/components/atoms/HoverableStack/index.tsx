import { Stack, StackProps } from '@mui/material';
import { MetricSize, Color } from '~/assets/variables';

interface Props extends StackProps {
  onClick: (() => void) | undefined;
  children: React.ReactNode;
}
export default function HoverableStack({ onClick, children, ...props }: Props) {
  return (
    <Stack
      {...props}
      onClick={onClick}
      sx={{
        transition: 'all 200ms ease',
        marginBottom: MetricSize.medium_15,
        marginRight: { xs: '0', md: '10px' },
        boxShadow: 2,
        borderColor: Color.grey,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        position: 'relative',
        background: Color.white,
        filter: 'contrast(1)',
        WebkitFontSmoothing: 'subpixel-antialiased',
        backfaceVisibility: 'hidden',
        ':hover': {
          cursor: 'pointer',
          boxShadow: 10,
          // transform: 'scale(1.005)',
          transformOrigin: '100% 0',
          WebkitFontSmoothing: 'subpixel-antialiased',
        },
      }}
    >
      {children}
    </Stack>
  );
}
