import { Box, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomStepper, {
  StepPayload,
} from '~/components/molecules/CustomStepper';
import { image } from '~/constants/image';
import { useQueryGetDetailUserCourse } from '~/hooks/course/useQueryGetDetailUserCourse';
import globalStyles from '~/styles';
import { formatStringToNumber } from '~/utils/number';

export default function MentorCourseTutorialPage() {
  const { id } = useParams();
  const courseId = formatStringToNumber(id);
  const [activeStep, setActiveStep] = useState(0);

  const { data } = useQueryGetDetailUserCourse(courseId);

  const handleChangeStep = (step: number) => {
    setActiveStep(step);
  };

  const steps: StepPayload[] = [
    {
      id: 0,
      isCompleted: Boolean(data?.course),
      label: 'Thêm thông tin khóa học',
      description:
        'Xem lại khóa học vừa tạo của bạn. Khóa học này sẽ được hiển thị ra ngoài cho học sinh xem và đăng kí.',
    },
    {
      id: 1,
      isCompleted: Boolean(data?.content),
      label: 'Thêm nội dung khóa học',
      description:
        'Thêm nội dung giảng dạy để học sinh có thể biết chương trình học của bạn thú vị ra sao.',
    },
    {
      id: 2,
      isCompleted: Boolean(data?.classes),
      label: 'Thêm danh sách lớp học',
      description:
        'Thêm lớp và khung giờ học phù hợp với lịch làm việc của bạn.',
    },
  ];

  return (
    <Stack>
      <Stack>
        <Typography sx={globalStyles.textSmallLight}>
          Có vẻ bạn vừa mới tạo mới khóa học của mình ? Tiếp theo bạn hãy thực
          các bước sau để đầy đủ thông tin cho việc phê duyệt khóa học này để
          dạy chính thức.
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
