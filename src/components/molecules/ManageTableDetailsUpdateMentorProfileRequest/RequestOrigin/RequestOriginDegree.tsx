import { Grid, Typography, Stack, Link } from '@mui/material';
import { useGetMentorProfileUpdateRequestDetails } from '~/hooks/user/UseGetMentorProfileUpdateRequestPayload';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from '../style';
import sx from './style';

interface RequestOriginDegreeProps {
  rowId: number;
}

export default function RequestOriginDegree({
  rowId,
}: RequestOriginDegreeProps) {
  const enum Text {
    mainTitle = 'Bằng cấp / CV',
  }

  const { updaterRequestDetails, isLoading } =
    useGetMentorProfileUpdateRequestDetails(rowId);

  const userDegreeList: any[] = [];

  return (
    <Stack sx={sx.wrapperEditSelected}>
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>{Text.mainTitle}</Typography>
        </Grid>
        {userDegreeList.map((item: any, index: number) => (
          <Grid item xs={12} key={item.id}>
            <Link href={item.url} target="_blank">
              <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {index + 1}. {item.name}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
