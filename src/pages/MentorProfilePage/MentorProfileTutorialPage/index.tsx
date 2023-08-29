import { Box, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomStepper, {
  StepPayload,
} from '~/components/molecules/CustomStepper';
import { image } from '~/constants/image';
import {
  MentorCourseActionLink,
  MentorDashboardNavigationActionLink,
  MentorNavigationLink,
  NavigationLink,
} from '~/constants/routeLink';
import { useCheckCompleteness } from '~/hooks/mentorProfile/useCheckCompleteness';
import globalStyles from '~/styles';
import { formatStringToNumber } from '~/utils/number';

export default function MentorProfileTutorialPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = formatStringToNumber(id);
  const [activeStep, setActiveStep] = useState(0);

  const { mentorProfilesCompleteness } = useCheckCompleteness();

  const isRequiredAddress =
    !!mentorProfilesCompleteness?.missingInformation[0].requiredInfo.fields.find(
      (item) => item.field === 'address'
    );

  const handleChangeStep = (step: number) => {
    setActiveStep(step);
  };

  const steps: StepPayload[] = [
    {
      id: 0,
      isCompleted: false,
      label: 'Thêm địa chỉ',
      onClick: () =>
        navigate(
          `/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_personal_info}/#basic`
        ),
      description: 'Thêm địa chỉ nơi ở của bạn',
    },
    {
      id: 1,
      isCompleted: false,
      label: 'Thêm ảnh đại diện',
    },
    {
      id: 2,
      isCompleted: false,
      label: 'Thêm ảnh căn cước công dân mặt trước',
      onClick: () =>
        navigate(
          `/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_mentor_info}`
        ),
    },
    {
      id: 3,
      isCompleted: false,
      label: 'Thêm ảnh căn cước công dân mặt sau',
      onClick: () =>
        navigate(
          `/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_mentor_info}`
        ),
    },

    {
      id: 4,
      isCompleted: false,
      label: 'Thêm bằng cấp',
      onClick: () =>
        navigate(
          `/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_mentor_info}`
        ),
    },
    {
      id: 5,
      isCompleted: false,
      label: 'Thêm thông tin giới thiệu',
      onClick: () =>
        navigate(
          `/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_mentor_info}`
        ),
    },
    {
      id: 6,
      isCompleted: false,
      label: 'Thêm số năm kinh nghiệm',
      onClick: () =>
        navigate(
          `/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_mentor_info}`
        ),
    },
    {
      id: 7,
      isCompleted: false,
      label: 'Thêm kĩ năng lập trình',
      onClick: () =>
        navigate(
          `/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_mentor_info}`
        ),
    },
    {
      id: 8,
      isCompleted: false,
      label: 'Phê duyệt hồ sơ giảng dạy',
    },
  ];

  return (
    <Stack>
      <Stack>
        <Typography sx={globalStyles.textSmallLight}>
          Có vẻ bạn vừa mới tham gia vào hệ thống Mismart ? Tiếp theo bạn hãy
          thực các bước sau để đầy đủ thông tin cho việc trở thành giảng viên
          chính thức của hệ thống và bắt đầu dạy học.
        </Typography>
      </Stack>
      <Grid marginTop={1} container>
        <Grid item xs={12} md={4}>
          <CustomStepper
            activeStep={activeStep}
            steps={steps}
            vertical
            handleActiveStep={handleChangeStep}
          />
        </Grid>
        <Grid item xs={12} md={8} padding={2}>
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={image.guide}
              alt="guide"
              sx={{
                width: '100%',
                objectFit: 'contain',
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
