import { Stepper, Step, StepButton, Stack } from '@mui/material';
// eslint-disable-next-line import/no-cycle
import VerticalStepper from './VerticalStepper';

export interface StepPayload {
  id: number;
  label: string;
  description?: string;
  isCompleted: boolean;
  onClick?: () => void;
}

export interface CustomStepperProps {
  activeStep: number;
  steps: StepPayload[];
  handleActiveStep: (step: number) => void;
  vertical?: boolean;
  clickable?: boolean;
}

export default function CustomStepper({
  steps,
  activeStep,
  handleActiveStep,
  vertical = false,
  clickable = false,
}: CustomStepperProps) {
  const handleStep = (step: number) => () => {
    if (steps[step].isCompleted || clickable) {
      handleActiveStep(step);
    }
  };

  if (vertical) {
    return (
      <VerticalStepper
        activeStep={activeStep}
        handleActiveStep={handleActiveStep}
        steps={steps}
      />
    );
  }

  return (
    <Stack marginY={2}>
      <Stepper
        nonLinear={clickable}
        orientation={vertical ? 'vertical' : 'horizontal'}
        activeStep={activeStep}
      >
        {steps.map((item, index) => (
          <Step
            sx={{ minWidth: '200px' }}
            key={item.id}
            completed={item.isCompleted}
          >
            <StepButton color="inherit" onClick={handleStep(index)}>
              {item.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
