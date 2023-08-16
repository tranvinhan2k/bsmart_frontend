import { Button, Grid, Stack, Typography } from '@mui/material';
import Icon from '~/components/atoms/Icon';
import sx from './style';

export default function MentorProfileTeachingInfo() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Button sx={{ padding: 0 }}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Icon name="coPresent" size="small" color="grey" />
            <Typography sx={sx.completenessHelperText}>Lớp học</Typography>
          </Stack>
        </Button>
      </Grid>
    </Grid>
  );
}
