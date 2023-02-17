import { Box } from '@mui/material';
import { SX } from './style';
import Section1WhatIsLms from './Section1WhatIsLms';
import Section2LmsFeatures from './Section2LmsFeatures';
import Section3LmsBenefits from './Section3LmsBenefits';

export default function LmsSection() {
  return (
    <Box sx={SX.BOX}>
      <Section1WhatIsLms />
      <Section2LmsFeatures />
      <Section3LmsBenefits />
    </Box>
  );
}
