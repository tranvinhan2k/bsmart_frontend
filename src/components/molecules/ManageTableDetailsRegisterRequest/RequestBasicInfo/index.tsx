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
import { image } from '~/constants/image';
import { handleCopyToClipboard } from '~/utils/commonComp';
import { formatISODateStringToDisplayDate } from '~/utils/date';
import { formatPhoneNumberVi } from '~/utils/phone';
import {
  SX_FORM_ITEM_LABEL2,
  SX_FORM_ITEM_VALUE2,
  SX_FORM_LABEL,
  SX_WRAPPER,
  SX_USER_AVATAR_CLICKABLE,
} from '../style';

interface BasicInfoProps {
  row: any;
}
export default function BasicInfo({ row }: BasicInfoProps) {
  const userAvatar =
    row.userImages.find((item: any) => item.type === 'AVATAR')?.url ??
    undefined;

  const enum Text {
    mainTitle = 'Thông tin cá nhân',
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

  const title0 = [
    {
      id: 0,
      label: Text.labelName,
      value: row.fullName ?? '',
    },
    {
      id: 1,
      label: Text.labelMail,
      value: row.email ?? '',
    },
  ];

  const title1 = [
    {
      id: 0,
      label: Text.labelPhone,
      value: formatPhoneNumberVi(row.phone) ?? '',
    },
    {
      id: 1,
      label: Text.labelBirthDate,
      value: formatISODateStringToDisplayDate(row.birthday) ?? '',
    },
  ];

  const title2 = [
    {
      id: 0,
      label: Text.labelGender,
      value:
        genderData.find((item) => item.value === row.gender)?.label ??
        genderData[0].value ??
        '',
    },
  ];

  const title3 = [
    {
      id: 0,
      label: Text.labelAddress,
      value: row.address,
    },
  ];

  const title4 = [
    {
      id: 0,
      label: Text.labelWebsite,
      value: row.website,
    },
    {
      id: 1,
      label: Text.labelLinkedIn,
      value: row.linkedinLink,
    },
    {
      id: 2,
      label: Text.labelFacebook,
      value: row.facebookLink,
    },
  ];

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
              spacing={4}
            >
              <Avatar
                src={userAvatar}
                variant="rounded"
                sx={SX_USER_AVATAR_CLICKABLE}
                onClick={() => handleViewImg(userAvatar)}
              />
              <Box>
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
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  mt={4}
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
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  mt={4}
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
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
