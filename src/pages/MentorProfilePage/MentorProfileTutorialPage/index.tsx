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
      isCompleted: !isRequiredAddress,
      label: 'Thêm địa chỉ',
      onClick: () =>
        navigate(
          `/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_personal_info}/#basic`
        ),
      description: 'Thêm địa chỉ nơi ở của bạn',
    },
    {
      id: 1,
      isCompleted:
        !mentorProfilesCompleteness?.missingInformation[0].requiredInfo.fields.find(
          (item) => item.field === 'AVATAR'
        ),
      label: 'Thêm ảnh đại diện',
    },
    {
      id: 2,
      isCompleted:
        !mentorProfilesCompleteness?.missingInformation[0].requiredInfo.fields.find(
          (item) => item.field === 'FRONTCI'
        ),
      label: 'Thêm ảnh căn cước công dân mặt trước',
      onClick: () =>
        navigate(
          `/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_mentor_info}`
        ),
    },
    {
      id: 3,
      isCompleted:
        !mentorProfilesCompleteness?.missingInformation[0].requiredInfo.fields.find(
          (item) => item.field === 'BACKCI'
        ),
      label: 'Thêm ảnh căn cước công dân mặt sau',
      onClick: () =>
        navigate(
          `/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_mentor_info}`
        ),
    },

    {
      id: 4,
      isCompleted:
        !mentorProfilesCompleteness?.missingInformation[0].requiredInfo.fields.find(
          (item) => item.field === 'DEGREE'
        ),
      label: 'Thêm bằng cấp',
      onClick: () =>
        navigate(
          `/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_mentor_info}`
        ),
    },
    {
      id: 5,
      isCompleted:
        !mentorProfilesCompleteness?.missingInformation[0].requiredInfo.fields.find(
          (item) => item.field === 'introduce'
        ),
      label: 'Thêm thông tin giới thiệu',
      onClick: () =>
        navigate(
          `/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_mentor_info}`
        ),
    },
    {
      id: 6,
      isCompleted:
        !mentorProfilesCompleteness?.missingInformation[0].requiredInfo.fields.find(
          (item) => item.field === 'workingExperience'
        ),
      label: 'Thêm số năm kinh nghiệm',
      onClick: () =>
        navigate(
          `/${NavigationLink.mentor_profile}/${MentorNavigationLink.edit_profile_mentor_info}`
        ),
    },
    {
      id: 7,
      isCompleted:
        !mentorProfilesCompleteness?.missingInformation[0].requiredInfo.fields.find(
          (item) => item.field === 'skills'
        ),
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

  useEffect(() => {
    if (mentorProfilesCompleteness) {
      let paramActiveIndex = activeStep;
      for (let index = paramActiveIndex; index < steps.length; index += 1) {
        const element = steps[index];

        if (element.isCompleted) {
          paramActiveIndex = index !== steps.length - 1 ? index + 1 : index;
        }
      }
      setActiveStep(paramActiveIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentorProfilesCompleteness]);

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
