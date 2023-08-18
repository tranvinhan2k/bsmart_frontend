import { Avatar, Button, Rating, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Icon, { IconName } from '~/components/atoms/Icon';
import sx from './style';

import { useGetMentorDetails } from '~/hooks/mentorProfile/useGetMentorDetails';

export default function MentorDetailsRight() {
  const { id } = useParams();
  const { mentorDetails } = useGetMentorDetails(Number(id));
  const ratingStar = mentorDetails?.averageRate || 0;
  const numberOfRatingStar = mentorDetails?.submissionCount || 0;

  const avatar = mentorDetails
    ? mentorDetails.user.userImages.find((item: any) => item.type === 'AVATAR')
        ?.url ?? undefined
    : undefined;

  const buttonList = mentorDetails
    ? [
        {
          id: 0,
          iconName: 'languageIcon',
          label: 'Website',
          link: mentorDetails?.user.website ?? null,
        },
        {
          id: 1,
          iconName: 'facebook',
          label: 'Facebook',
          link: mentorDetails?.user.facebookLink ?? null,
        },
        {
          id: 2,
          iconName: 'linkedin',
          label: 'Twitter',
          link: mentorDetails?.user.linkedinLink ?? null,
        },
      ]
    : [];

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      sx={sx.mainWrapper}
    >
      <Avatar
        src={avatar}
        variant="circular"
        sx={{
          width: 150,
          height: 150,
          boxShadow: 3,
        }}
      />
      <Stack sx={{ flexDirection: 'row', alignItems: 'center' }} marginTop={1}>
        <Typography>{`(${numberOfRatingStar})`}</Typography>
        <Stack marginLeft={1}>
          <Rating value={ratingStar} readOnly />
        </Stack>
      </Stack>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
      >
        {buttonList.map((item) => (
          <Button
            variant="outlined"
            color="miSmartOrange"
            startIcon={<Icon name={item.iconName as IconName} size="small" />}
            disabled={!item.link}
            key={item.id}
          >
            {item.label}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
