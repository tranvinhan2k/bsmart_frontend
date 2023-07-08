import { useState } from 'react';

import { Box, Stack, Collapse } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Color } from '~/assets/variables';

import Icon from '~/components/atoms/Icon';
import Button from '~/components/atoms/Button';
import { useTimeOut, useTryCatch, useYupValidationResolver } from '~/hooks';
import { validationClassContentSection } from '~/form/validation';
import AddSectionForm from '../AddSectionForm';

interface Props {
  onAdd: (name: string, introduce: string) => void;
}

export default function AddSection({ onAdd }: Props) {
  const { handleTryCatch } = useTryCatch('thêm học phần mới');
  const { onSleep } = useTimeOut(1000);

  const resolver = useYupValidationResolver(validationClassContentSection);
  const hookForm = useForm({
    resolver,
  });

  const [open, setOpen] = useState<boolean>(false);

  const handleTriggerFormCreateSection = () => {
    setOpen(!open);
  };

  const handleSubmit = async (data: { name: string; introduce: string }) => {
    await handleTryCatch(() => onSleep(true));
    onAdd(data.name, data.introduce);
    hookForm.reset();
    handleTriggerFormCreateSection();
  };

  return (
    <Stack
      sx={{
        transition: 'height 1s',
        marginTop: 1,
      }}
    >
      <Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            color: Color.white,
          }}
          onClick={handleTriggerFormCreateSection}
          startIcon={<Icon name="add" size="small_20" color="white" />}
        >
          Học phần
        </Button>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack
          sx={{
            marginTop: 1,
            padding: 2,
            background: Color.whiteSmoke,
          }}
        >
          <AddSectionForm hookForm={hookForm} onSubmit={handleSubmit} />
        </Stack>
      </Collapse>
    </Stack>
  );
}
