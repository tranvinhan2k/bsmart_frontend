import { Stack } from '@mui/material';
import styles from './styles';

interface Props {
  name: string;
}

export default function DayOfWeekCell({ name }: Props) {
  return (
    <Stack sx={styles.view3}>
      <Stack sx={styles.viewDayOfWeek}>{name}</Stack>
    </Stack>
  );
}
