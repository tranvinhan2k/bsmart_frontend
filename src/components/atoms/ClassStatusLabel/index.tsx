import { Stack, Typography, Badge } from '@mui/material';

interface Props {
  label: string;
  numberOfItem: number;
}

export default function ClassStatusLabel({ label, numberOfItem = 0 }: Props) {
  return (
    <Stack sx={{ alignItems: 'center', flexDirection: 'row' }}>
      <Typography>{label}</Typography>

      <Stack
        sx={{
          transition: 'all 200ms ease',
          marginLeft: 1,
          position: 'relative',
          width: numberOfItem !== 0 ? '10px' : 0,
        }}
      >
        <Badge
          sx={{ marginLeft: 1 }}
          color="default"
          badgeContent={numberOfItem}
        />
      </Stack>
    </Stack>
  );
}
