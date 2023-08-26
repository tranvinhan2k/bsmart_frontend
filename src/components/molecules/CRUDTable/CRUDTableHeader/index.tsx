import { Stack, Typography, Button } from '@mui/material';
import Icon from '~/components/atoms/Icon';

import globalStyles from '~/styles';

interface CRUDTableHeaderProps {
  title: string;
  addButtonTitle: string;
  onCreate: () => void;
}

export default function CRUDTableHeader({
  title,
  addButtonTitle,
  onCreate,
}: CRUDTableHeaderProps) {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Stack>
        <Typography sx={globalStyles.textSubTitle}>{title}</Typography>
      </Stack>
      <Stack>
        <Button
          startIcon={<Icon name="add" color="white" size="small_20" />}
          onClick={onCreate}
          variant="contained"
          color="miSmartOrange"
        >
          {addButtonTitle}
        </Button>
      </Stack>
    </Stack>
  );
}
