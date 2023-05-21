import { Stack, Typography } from '@mui/material';
import { Color, MetricSize } from '~/assets/variables';
import Button from '~/components/atoms/Button';
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
          startIcon={<Icon name="add" color="white" size="small" />}
          onClick={onCreate}
          variant="contained"
          sx={{ background: Color.orange }}
        >
          {addButtonTitle}
        </Button>
      </Stack>
    </Stack>
  );
}
