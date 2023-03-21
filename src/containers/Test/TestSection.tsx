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
    id: 1,
    label: 'Option 1',
    value: 'OPTION_1',
  },
  {
    id: 2,
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
          defaultValue="Hello"
        />
        <FormInput
          variant="password"
          control={control}
          name="password"
          label="Password Input"
          placeholder="Text"
          defaultValue="Hello"
        />
        <FormInput
          variant="dropdown"
          control={control}
          name="dropdown"
          label="Dropdown Input"
          placeholder="Dropdown"
          data={optionData}
          defaultValue={{
            id: 0,
            label: 'Option 1',
            value: 'OPTION_1',
          }}
        />
        <FormInput
          variant="number"
          control={control}
          name="number"
          label="Number Input"
          placeholder="Number"
          defaultValue={1}
        />
        <FormInput
          variant="multiline"
          control={control}
          name="multiline"
          label="Multiline Input"
          placeholder="Multiline"
          defaultValue="Hello"
        />
        <FormInput
          variant="image"
          control={control}
          name="image"
          label="Image Input"
          placeholder="Image"
          defaultValue="Hello"
        />
        <FormInput
          variant="radioGroup"
          control={control}
          name="radio"
          label="Radio Input"
          placeholder="Radio"
          data={optionData}
          defaultValue={{
            id: 0,
            label: 'Option 1',
            value: 'OPTION_1',
          }}
        />
        <FormInput
          variant="date"
          control={control}
          name="date"
          label="Date Input"
          placeholder="Date"
          data={optionData}
          defaultValue="Hello"
        />
        <FormInput
          variant="tags"
          control={control}
          name="tag"
          label="Tag Input"
          placeholder="Tags"
          data={optionData}
          defaultValue={{
            id: 0,
            label: 'Option 1',
            value: 'OPTION_1',
          }}
        />
        <Button customVariant="form" type="submit">
          Submit
        </Button>
      </form>
    </Stack>
  );
}
