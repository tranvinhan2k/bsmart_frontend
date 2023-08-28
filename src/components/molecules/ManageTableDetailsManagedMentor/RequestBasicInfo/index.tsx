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
import { handleViewImgFromUrl } from '~/utils/common';
import { useGetManagedMentorDetails } from '~/hooks/user/useGetManagedMentorDetails';
import Icon from '~/components/atoms/Icon';
import {
  SX_FORM_ITEM_LABEL2,
  SX_FORM_ITEM_VALUE2,
  SX_FORM_LABEL,
  SX_USER_AVATAR_CLICKABLE,
  SX_WRAPPER,
} from '../style';

interface BasicInfoProps {
  idMentor: number;
}
export default function BasicInfo({ idMentor }: BasicInfoProps) {
  const enum Text {
    mainTitle = 'Giảng viên',
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
    //
    labelCoursePossess = 'Khóa học',
    labelClassPossess = 'Lớp học',
    labelRating = 'Đánh giá',
    labelNoOfRating = 'Số đánh giá',
  }

  const { managedMentorDetails } = useGetManagedMentorDetails(idMentor);
  const userAvatar = managedMentorDetails
    ? managedMentorDetails.userImages.find(
        (item: any) => item.type === 'AVATAR'
      )?.url
    : undefined;

  const title0 = [
    {
      id: 0,
      label: Text.labelName,
      value: managedMentorDetails ? managedMentorDetails.fullName : '',
    },
    {
      id: 1,
      label: Text.labelMail,
      value: managedMentorDetails ? managedMentorDetails.email : '',
    },
  ];

  const title1 = [
    {
      id: 0,
      label: Text.labelPhone,
      value: managedMentorDetails ? managedMentorDetails.phone : '',
    },
    {
      id: 1,
      label: Text.labelBirthDate,
      value: managedMentorDetails
        ? formatISODateStringToDisplayDate(managedMentorDetails.birthday)
        : '',
    },
  ];

  const title2 = [
    {
      id: 0,
      label: Text.labelGender,
      value: managedMentorDetails
        ? genderData.find((item) => item.value === managedMentorDetails.gender)
            ?.label ?? genderData[0].value
        : '',
    },
  ];
  const title3 = [
    {
      id: 1,
      label: Text.labelAddress,
      value: managedMentorDetails ? managedMentorDetails.address : '',
    },
  ];

  const title4 = [
    {
      id: 0,
      label: Text.labelWebsite,
      value: managedMentorDetails ? managedMentorDetails.website : '',
    },
    {
      id: 1,
      label: Text.labelLinkedIn,
      value: managedMentorDetails ? managedMentorDetails.linkedinLink : '',
    },
    {
      id: 2,
      label: Text.labelFacebook,
      value: managedMentorDetails ? managedMentorDetails.facebookLink : '',
    },
  ];

  return (
    <Box sx={SX_WRAPPER}>
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
                sx={SX_USER_AVATAR_CLICKABLE}
                onClick={() => handleViewImgFromUrl(userAvatar)}
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
                          direction="column"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          spacing={1}
                        >
                          <Typography sx={SX_FORM_ITEM_LABEL2}>
                            {item.label}:
                          </Typography>
                          <Typography sx={SX_FORM_ITEM_VALUE2}>
                            {item.value}
                          </Typography>
                        </Stack>
                      </Grid>
                    ))}
                    {title4.map((item) => (
                      <Grid item xs={12} key={item.id}>
                        <Stack
                          direction="column"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          spacing={1}
                        >
                          <Typography sx={SX_FORM_ITEM_LABEL2}>
                            {item.label}:
                          </Typography>
                          {item.value && (
                            <Link
                              href={item.value as string}
                              sx={SX_FORM_ITEM_VALUE2}
                              target="_blank"
                            >
                              {item.value}
                            </Link>
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
