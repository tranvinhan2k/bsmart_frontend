import { Grid, Typography, Stack, Link } from '@mui/material';
import { useGetManagedMentorDetails } from '~/hooks/user/useGetManagedMentorDetails';
import { SX_BOX_ITEM_WRAPPER, SX_FORM_LABEL } from './style';

interface BasicInfoProps {
  idMentor: number;
}

export default function RequestMentorDegree({ idMentor }: BasicInfoProps) {
  const enum Text {
    mainTitle = 'Bằng cấp',
  }

  const { managedMentorDetails } = useGetManagedMentorDetails(idMentor);

  const userDegreeList =
    managedMentorDetails &&
    managedMentorDetails.userImages.filter(
      (item: any) => item.type === 'DEGREE'
    );

  return (
    <Stack sx={SX_BOX_ITEM_WRAPPER}>
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={SX_FORM_LABEL}>{Text.mainTitle}</Typography>
        </Grid>
        {userDegreeList &&
          userDegreeList.map((item: any, index) => (
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
