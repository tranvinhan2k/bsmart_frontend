import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import Icon from '~/components/atoms/Icon';
import { genderData } from '~/constants';
import { useGetMentorProfileUpdateRequestDetails } from '~/hooks/user/UseGetMentorProfileUpdateRequestPayload';
import { handleCopyToClipboard } from '~/utils/commonComp';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import { formatPhoneNumberVi } from '~/utils/phone';
import {
  SX_FORM_ITEM_LABEL2,
  SX_FORM_ITEM_VALUE2,
  SX_FORM_LABEL,
  SX_USER_AVATAR_CLICKABLE,
  SX_WRAPPER,
} from '../style';
import sx from './style';

interface RequestEditBasicInfoProps {
  rowId: number;
}
export default function RequestEditBasicInfo({
  rowId,
}: RequestEditBasicInfoProps) {
  const { updaterRequestDetails, isLoading } =
    useGetMentorProfileUpdateRequestDetails(rowId);

  const enum Text {
    mainTitle = 'Thông tin cơ bản',
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

  const title0 = updaterRequestDetails
    ? [
        {
          id: 0,
          label: Text.labelName,
          value: updaterRequestDetails.userDtoEdit.fullName ?? '',
        },
        {
          id: 0,
          label: Text.labelPhone,
          value: formatPhoneNumberVi(updaterRequestDetails.userDtoEdit.phone),
        },
      ]
    : [];

  const title1 = updaterRequestDetails
    ? [
        {
          id: 0,
          label: Text.labelBirthDate,
          value:
            formatISODateStringToDisplayDate(
              updaterRequestDetails.userDtoEdit.birthday
            ) ?? '',
        },
        {
          id: 1,
          label: Text.labelGender,
          value:
            genderData.find(
              (item) => item.value === updaterRequestDetails.userDtoEdit.gender
            )?.label ??
            genderData[0].value ??
            '',
        },
      ]
    : [];

  const title3 = updaterRequestDetails
    ? [
        {
          id: 0,
          label: Text.labelAddress,
          value: updaterRequestDetails.userDtoEdit.address,
        },
      ]
    : [];

  const title4 = updaterRequestDetails
    ? [
        {
          id: 0,
          label: Text.labelWebsite,
          value: updaterRequestDetails.userDtoEdit.website,
        },
        {
          id: 1,
          label: Text.labelLinkedIn,
          value: updaterRequestDetails.userDtoEdit.linkedinLink,
        },
        {
          id: 2,
          label: Text.labelFacebook,
          value: updaterRequestDetails.userDtoEdit.facebookLink,
        },
      ]
    : [];

  const handleViewImg = (link: string) => {
    if (link) window.open(link, '_blank');
  };

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
              spacing={2}
            >
              <Button>
                <Box>
                  <Avatar
                    // src="https://avatars.githubusercontent.com/u/4040241?v=4"
                    variant="rounded"
                    sx={{ width: 100, height: 100 }}
                    // onClick={() => handleViewImg(userAvatar)}
                  />
                </Box>
              </Button>
              <Box sx={{ width: '100%' }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={1}
                >
                  {title0.map((item) => (
                    <Grid item xs={6} key={item.id}>
                      <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        sx={sx.itemEditSelected}
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
                  {title1.map((item) => (
                    <Grid item xs={6} key={item.id}>
                      <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        sx={sx.itemEditSelected}
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
                </Grid>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Box mt={1}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            {title3.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Stack
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={1}
                  sx={sx.itemEditSelected}
                >
                  <Typography sx={SX_FORM_ITEM_LABEL2}>
                    {item.label}:
                  </Typography>
                  <Typography sx={SX_FORM_ITEM_VALUE2}>{item.value}</Typography>
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
                  sx={sx.itemEditSelected}
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
    </Box>
  );
}
