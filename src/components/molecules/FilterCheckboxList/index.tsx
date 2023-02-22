import { Stack } from '@mui/material';
import FilterCheckbox from './FilterCheckbox';
import { CheckBoxPayload } from '~/models';

interface FilterCheckboxListProps {
  fields: CheckBoxPayload[];
  subjects: CheckBoxPayload[];
  types: CheckBoxPayload[];
  provinces: CheckBoxPayload[];
}

export default function FilterCheckboxList({
  fields,
  provinces,
  subjects,
  types,
}: FilterCheckboxListProps) {
  return (
    <Stack marginTop={1}>
      <FilterCheckbox label="LĨNH VỰC" data={fields} />
      <FilterCheckbox label="MÔN HỌC" data={subjects} />
      <FilterCheckbox label="HÌNH THỨC" data={types} />
      <FilterCheckbox label="KHU VỰC" data={provinces} />
    </Stack>
  );
}
