import { useState } from 'react';

import { Box, Stack, Typography, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Color, MetricSize } from '~/assets/variables';

import Icon from '~/components/atoms/Icon';
import FormInput from '~/components/atoms/FormInput';
import Button from '~/components/atoms/Button';
import { useYupValidationResolver } from '~/hooks';
import { validationClassContentSection } from '~/form/validation';

interface CreateClassSectionProps {
  onAddNew: (name: string, introduce: string) => void;
}

export default function CreateClassSection({
  onAddNew,
}: CreateClassSectionProps) {
  const resolver = useYupValidationResolver(validationClassContentSection);
  const hookForm = useForm({
    resolver,
  });
  const [open, setOpen] = useState<boolean>(false);

  const handleTriggerFormCreateSection = () => {
    setOpen(!open);
  };

  const handleSubmit = (data: { name: string; introduce: string }) => {
    onAddNew(data.name, data.introduce);
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
          onClick={handleTriggerFormCreateSection}
          sx={{ boxShadow: 1, background: Color.grey }}
        >
          <Icon name="add" size="medium" color="black" />
          <Typography>Thêm học phần</Typography>
        </Button>
      </Box>
      {open && (
        <Stack
          sx={{
            borderRadius: MetricSize.small_5,
            boxShadow: 1,
            background: Color.white,
            padding: 2,
            marginTop: 1,
          }}
        >
          <FormInput
            label="Tên phần học"
            placeholder="Nhập tên phần học muốn tạo"
            name="name"
            control={hookForm.control}
          />
          {/* <Stack marginTop={2}>
            <FormInput
              label="Giới thiệu"
              placeholder="Nhập đôi dòng giới thiệu về phần học"
              variant="multiline"
              name="description"
              control={hookForm.control}
            />
          </Stack> */}
          <Stack
            sx={{
              marginTop: 2,
            }}
          >
            <Button
              onClick={hookForm.handleSubmit(handleSubmit as any)}
              customVariant="form"
            >
              Tạo học phần
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
