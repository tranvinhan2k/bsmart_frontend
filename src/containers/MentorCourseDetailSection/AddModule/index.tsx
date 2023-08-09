import { useState } from 'react';

import { Box, Stack, Typography, Collapse } from '@mui/material';
import { Color } from '~/assets/variables';

import Icon from '~/components/atoms/Icon';
import Button from '~/components/atoms/Button';
import ChooseTypeOfSubSection from '~/components/molecules/ChooseTypeOfSubSection';

interface CreateSectionModulePayload {
  id: number;
}

export default function AddModule({ id }: CreateSectionModulePayload) {
  const [open, setOpen] = useState<boolean>(false);

  const handleTriggerFormCreateModule = () => {
    setOpen(!open);
  };

  return (
    <Stack>
      <Box>
        <Button
          variant="contained"
          color={open ? 'error' : 'secondary'}
          onClick={handleTriggerFormCreateModule}
          sx={{ color: Color.white }}
          startIcon={
            <Icon name={open ? 'close' : 'add'} size="small_20" color="white" />
          }
        >
          <Typography>{open ? 'Hủy' : 'Thêm nội dung học phần'}</Typography>
        </Button>
      </Box>
      <Collapse in={open}>
        <Stack marginTop={1}>
          <ChooseTypeOfSubSection sectionId={id} />
        </Stack>
      </Collapse>
    </Stack>
  );
}
