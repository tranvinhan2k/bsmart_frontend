import { useEffect } from 'react';

import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';

// eslint-disable-next-line import/no-cycle
import { StepPayload } from '.';

export interface Props {
  activeStep: number;
  steps: StepPayload[];
  handleActiveStep: (step: number) => void;
}

export default function VerticalStepper({
  activeStep,
  handleActiveStep,
  steps,
}: Props) {
  useEffect(() => {
    if (steps[activeStep].isCompleted && activeStep !== steps.length - 1) {
      handleActiveStep(activeStep + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label} completed={step.isCompleted}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Bước cuối cùng</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {step.onClick && (
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={step.onClick}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Hoàn thành' : 'Đi tới'}
                    </Button>
                  </div>
                </Box>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
