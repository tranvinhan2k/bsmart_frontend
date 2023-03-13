import { Stack } from '@mui/material';
import FilterCheckbox from './FilterCheckbox';
import { OptionPayload } from '~/models';

interface FilterCheckboxListProps {
  fields: OptionPayload[] | undefined;
  subjects: OptionPayload[] | undefined;
  types: OptionPayload[] | undefined;
  provinces: OptionPayload[] | undefined;

  onFields: (data: number[]) => void;
  onSubjects: (data: number[]) => void;
  onTypes: (data: number[]) => void;
  onProvinces: (data: number[]) => void;
}

export default function FilterCheckboxList({
  fields,
  provinces,
  subjects,
  types,
  onFields,
  onProvinces,
  onSubjects,
  onTypes,
}: FilterCheckboxListProps) {
  return (
    <Stack marginTop={1}>
      <FilterCheckbox label="LĨNH VỰC" data={fields} onChange={onFields} />
      <FilterCheckbox label="MÔN HỌC" data={subjects} onChange={onSubjects} />
      <FilterCheckbox label="HÌNH THỨC" data={types} onChange={onTypes} />
      <FilterCheckbox label="KHU VỰC" data={provinces} onChange={onProvinces} />
    </Stack>
  );
}
