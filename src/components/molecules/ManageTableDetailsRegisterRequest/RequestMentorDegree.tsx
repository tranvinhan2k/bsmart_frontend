import { Grid, Typography, Stack, Link } from '@mui/material';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface BasicInfoProps {
  row: any;
}

export default function RequestMentorDegree({ row }: BasicInfoProps) {
  const userDegreeList = row.userImages.filter(
    (item: any) => item.type === 'DEGREE'
  );

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>Bằng cấp</Typography>
        </Grid>
        {userDegreeList.map((item: any, index: number) => (
          <Grid item xs={12} key={item.id}>
            <Link href={item.url} target="_blank">
              <Typography noWrap>
                {index + 1}. {item.name}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
