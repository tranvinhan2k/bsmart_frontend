import { useState } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Color, MetricSize } from '~/assets/variables';

import Icon from '~/components/atoms/Icon';
import FormInput from '~/components/atoms/FormInput';
import Button from '~/components/atoms/Button';
import { useYupValidationResolver } from '~/hooks';
import { validationClassContentModule } from '~/form/validation';

interface CreateSectionModuleProps {
  id: number;
  onAddNew: (id: number, name: string) => void;
}

export default function CreateSectionModule({
  id,
  onAddNew,
}: CreateSectionModuleProps) {
  const resolver = useYupValidationResolver(validationClassContentModule);
  const hookForm = useForm({
    resolver,
  });
  const [open, setOpen] = useState<boolean>(false);

  const handleTriggerFormCreateModule = () => {
    setOpen(!open);
  };

  const handleSubmit = (data: { name: string }) => {
    onAddNew(id, data.name);
    hookForm.reset();
    handleTriggerFormCreateModule();
  };

  return (
    <Stack>
      <Box>
        <Button
          onClick={handleTriggerFormCreateModule}
          sx={{ background: Color.grey }}
        >
          <Icon name="add" size="small" color="black" />
          <Typography>Thêm bài học</Typography>
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
            label="Tên bài học"
            placeholder="Nhập tên bài học muốn tạo"
            name="name"
            control={hookForm.control}
          />

          <Stack marginTop={1}>
            <Button
              onClick={hookForm.handleSubmit(handleSubmit as any, (e) => {
                console.log(e);
              })}
              customVariant="form"
            >
              Tạo bài học
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
