import { Stack } from '@mui/material';
import FilterCheckbox from './FilterCheckbox';
import { OptionPayload } from '~/models';

interface FilterCheckboxListProps {
  categoryId: number[] | undefined;
  subjectId: number[] | undefined;

  fields: OptionPayload[] | undefined;
  subjects: OptionPayload[] | undefined;

  onFields: (data: number[]) => void;
  onSubjects: (data: number[]) => void;
}

export default function FilterCheckboxList({
  categoryId,
  subjectId,
  fields,
  subjects,
  onFields,
  onSubjects,
}: FilterCheckboxListProps) {
  return (
    <Stack marginTop={1}>
      <FilterCheckbox
        value={categoryId}
        label="LĨNH VỰC"
        data={fields}
        onChange={onFields}
      />
      <FilterCheckbox
        value={subjectId}
        label="MÔN HỌC"
        data={subjects}
        onChange={onSubjects}
      />
    </Stack>
  );
}
