import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import { OptionPayload } from '~/models';

const optionData: OptionPayload[] = [
  {
    id: 0,
    label: 'All',
    value: '',
  },
  {
    id: 0,
    label: 'Option 1',
    value: 'OPTION_1',
  },
  {
    id: 1,
    label: 'Option 2',
    value: 'OPTION_2',
  },
];

export default function TestSection() {
  const { control, handleSubmit } = useForm();

  function onSubmitSuccess(data: any) {
    console.log('data', data);
  }
  return (
    <Stack margin={5}>
      <form onSubmit={handleSubmit(onSubmitSuccess)}>
        <FormInput
          variant="text"
          control={control}
          name="text"
          label="Text Input"
          placeholder="Text"
        />
        <FormInput
          variant="password"
          control={control}
          name="password"
          label="Password Input"
          placeholder="Text"
        />
        <FormInput
          variant="dropdown"
          control={control}
          name="dropdown"
          label="Dropdown Input"
          placeholder="Dropdown"
          data={optionData}
        />
        <FormInput
          variant="number"
          control={control}
          name="number"
          label="Number Input"
          placeholder="Number"
        />
        <FormInput
          variant="multiline"
          control={control}
          name="multiline"
          label="Multiline Input"
          placeholder="Multiline"
        />
        <FormInput
          variant="image"
          control={control}
          name="image"
          label="Image Input"
          placeholder="Image"
        />
        <FormInput
          variant="radioGroup"
          control={control}
          name="radio"
          label="Radio Input"
          placeholder="Radio"
          data={optionData}
        />
        <FormInput
          variant="date"
          control={control}
          name="date"
          label="Date Input"
          placeholder="Date"
          data={optionData}
        />
        <FormInput
          variant="tags"
          control={control}
          name="tag"
          label="Tag Input"
          placeholder="Tags"
          data={optionData}
        />
        <Button customVariant="form" type="submit">
          Submit
        </Button>
      </form>
    </Stack>
  );
}
