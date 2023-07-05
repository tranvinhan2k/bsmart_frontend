import { Box, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CustomStepper, {
  StepPayload,
} from '~/components/molecules/CustomStepper';
import { image } from '~/constants/image';
import globalStyles from '~/styles';

interface Props {
  steps: StepPayload[];
}

export default function TutorialRequestCourse({ steps }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const handleChangeStep = (step: number) => {
    setActiveStep(step);
  };

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
