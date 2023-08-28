import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import { genderData } from '~/constants';
import { handleCopyToClipboard } from '~/utils/commonComp';
import { useGetManagedMemberDetails } from '~/hooks/user/useGetManagedMemberDetails';
import Icon from '~/components/atoms/Icon';
import {
  SX_FORM_ITEM_LABEL2,
  SX_FORM_ITEM_VALUE2,
  SX_FORM_LABEL,
  SX_WRAPPER,
} from '../style';

interface BasicInfoProps {
  idMentor: number;
  scrollRef: any;
}
export default function BasicInfo({ idMentor, scrollRef }: BasicInfoProps) {
  const enum Text {
    mainTitle = 'Học sinh',
    labelMail = 'Mail',
    labelName = 'Họ tên',
    labelPhone = 'Số điện thoại',
    //
    labelBirthDate = 'Ngày sinh',
    labelAddress = 'Địa chỉ',
    labelGender = 'Giới tính',
    labelWebsite = 'Website riêng',
    labelLinkedIn = 'LinkedIn',
    labelFacebook = 'Facebook',
  }

  const { managedMemberDetails } = useGetManagedMemberDetails(idMentor);
  const userAvatar = managedMemberDetails
    ? managedMemberDetails.userImages.find(
        (item: any) => item.type === 'AVATAR'
      )?.url
    : undefined;

  const title0 = managedMemberDetails
    ? [
        {
          id: 0,
          label: Text.labelName,
          value: managedMemberDetails.fullName,
        },
        {
          id: 1,
          label: Text.labelMail,
          value: managedMemberDetails.email,
        },
      ]
    : [];

  const title1 = managedMemberDetails
    ? [
        {
          id: 0,
          label: Text.labelPhone,
          value: managedMemberDetails.phone,
        },
        {
          id: 1,
          label: Text.labelBirthDate,
          value: formatISODateStringToDisplayDate(
            managedMemberDetails.birthday
          ),
        },
      ]
    : [];

  const title2 = managedMemberDetails
    ? [
        {
          id: 0,
          label: Text.labelGender,
          value:
            genderData.find(
              (item) => item.value === managedMemberDetails.gender
            )?.label ?? genderData[0].value,
        },
        {
          id: 1,
          label: Text.labelAddress,
          value: managedMemberDetails.address,
        },
      ]
    : [];

  const title3 = managedMemberDetails
    ? [
        {
          id: 0,
          label: Text.labelWebsite,
          value: managedMemberDetails.website,
        },
        {
          id: 1,
          label: Text.labelLinkedIn,
          value: managedMemberDetails.linkedinLink,
        },
        {
          id: 2,
          label: Text.labelFacebook,
          value: managedMemberDetails.facebookLink,
        },
      ]
    : [];

  return (
    <Box sx={SX_WRAPPER} ref={scrollRef}>
      <Box p={2}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={1}
        >
          <Grid item xs={12}>
            <Typography sx={SX_FORM_LABEL}>{Text.mainTitle}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={4}
            >
              <Avatar
                src={userAvatar}
                variant="rounded"
                sx={{
                  width: 150,
                  height: 150,
                  boxShadow: 3,
                }}
              />
              <Box sx={{ width: '100%' }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  {title0.map((item) => (
                    <Grid item xs={12} sm={12} md={12} lg={6} key={item.id}>
                      <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <Typography sx={SX_FORM_ITEM_LABEL2}>
                          {item.label}:
                          <IconButton
                            size="small"
                            onClick={() => handleCopyToClipboard(item.value)}
                          >
                            <Icon
                              name="contentCopyIcon"
                              size="small"
                              color="blue"
                            />
                          </IconButton>
                        </Typography>
                        <Typography sx={SX_FORM_ITEM_VALUE2} noWrap>
                          {item.value}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
                <Box mt={4}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    {title1.map((item) => (
                      <Grid item xs={12} sm={6} key={item.id}>
                        <Stack
                          direction="column"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                        >
                          <Typography sx={SX_FORM_ITEM_LABEL2}>
                            {item.label}:
                            <IconButton
                              size="small"
                              onClick={() => handleCopyToClipboard(item.value)}
                            >
                              <Icon
                                name="contentCopyIcon"
                                size="small"
                                color="blue"
                              />
                            </IconButton>
                          </Typography>
                          <Typography sx={SX_FORM_ITEM_VALUE2} noWrap>
                            {item.value}
                          </Typography>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Box mt={4}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                  >
                    {title2.map((item) => (
                      <Grid item xs={12} key={item.id}>
                        <Stack
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          spacing={1}
                        >
                          <Typography sx={SX_FORM_ITEM_LABEL2}>
                            {item.label}:
                          </Typography>
                          <Typography sx={SX_FORM_ITEM_VALUE2} noWrap>
                            {item.value}
                          </Typography>
                        </Stack>
                      </Grid>
                    ))}
                    {title3.map((item) => (
                      <Grid item xs={12} key={item.id}>
                        <Stack
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          spacing={1}
                        >
                          <Typography sx={SX_FORM_ITEM_LABEL2}>
                            {item.label}:
                          </Typography>
                          {item.value && (
                            <Link href={item.value as string}>Link</Link>
                          )}
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
