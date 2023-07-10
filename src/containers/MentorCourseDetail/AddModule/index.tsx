import { useState } from 'react';

import { Box, Stack, Typography, Collapse } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Color } from '~/assets/variables';

import Icon from '~/components/atoms/Icon';
import Button from '~/components/atoms/Button';
import { useTimeOut, useTryCatch, useYupValidationResolver } from '~/hooks';
import { validationClassContentModule } from '~/form/validation';
import AddSectionForm from '../AddSectionForm';

interface CreateSectionModulePayload {
  id: number;
  onAdd: (id: number, name: string) => void;
}

export default function AddModule({ id, onAdd }: CreateSectionModulePayload) {
  // const { handleTryCatch } = useTryCatch('thêm bài học mới');
  const { onSleep } = useTimeOut(1000);

  const resolver = useYupValidationResolver(validationClassContentModule);
  const hookForm = useForm({
    resolver,
  });
  const [open, setOpen] = useState<boolean>(false);

  const handleTriggerFormCreateModule = () => {
    setOpen(!open);
  };

  const handleSubmit = async (data: { name: string }) => {
    // await handleTryCatch(() => onSleep(true));
    await onAdd(id, data.name);
    hookForm.reset();
    handleTriggerFormCreateModule();
  };

  return (
    <Stack>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleTriggerFormCreateModule}
          sx={{ color: Color.white }}
          startIcon={<Icon name="add" size="small_20" color="white" />}
        >
          <Typography>Thêm bài học</Typography>
        </Button>
      </Box>
      <Collapse in={open}>
        <Stack marginTop={1}>
          <AddSectionForm hookForm={hookForm} onSubmit={handleSubmit} />
        </Stack>
      </Collapse>
    </Stack>
  );
}
