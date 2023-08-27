import { Grid, Link, Typography } from '@mui/material';
import { FontFamily } from '~/assets/variables';
import { useGetUpdateMentorProfileRequestInfo } from '~/hooks/user/useGetUpdateMentorProfileRequestInfo';
import { SX_FORM_ITEM_LABEL } from './style';

export default function RequestedDegrees() {
  const { requestInfo } = useGetUpdateMentorProfileRequestInfo();

  const enum Text {
    titleFirstHalf = 'Bằng cấp / CV (đã thêm',
    titleSecondHalf = ')',
    itemLabelDegree = 'Bằng cấp / CV',
  }
  return requestInfo &&
    requestInfo[0]?.degreeRequest &&
    requestInfo[0]?.degreeRequest.length > 0 ? (
    <>
      {/* <Typography
        variant="h3"
        sx={{ fontFamily: FontFamily.bold, fontSize: 20 }}
      >
        {Text.titleFirstHalf}{' '}
        <b style={{ color: 'red' }}>
          {requestInfo[0]?.mentorSkillRequest.length ?? 0}
        </b>
        {Text.titleSecondHalf}
      </Typography> */}
      <Grid container mt={2}>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_ITEM_LABEL}>
            {Text.itemLabelDegree}
          </Typography>
        </Grid>
        {requestInfo[0]?.degreeRequest.map((degree) => (
          <Grid item xs={12} key={degree.id}>
            <Link href={degree.url} target="_blank">
              <Typography noWrap>{degree.name}</Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  ) : null;
}
