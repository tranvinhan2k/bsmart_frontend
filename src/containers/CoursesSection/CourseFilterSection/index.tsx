import { Stack } from '@mui/material';
import SearchBar from '~/components/atoms/SearchBar';
import FilterCheckboxList from '~/components/molecules/FilterCheckboxList';
import {
  FieldCheckBoxPayload,
  ProvinceCheckBoxPayload,
  SubjectCheckBoxPayload,
  TypeCheckBoxPayload,
} from '~/constants';

export default function CourseFilterSection() {
  return (
    <Stack>
      <SearchBar />
      <FilterCheckboxList
        fields={FieldCheckBoxPayload}
        subjects={SubjectCheckBoxPayload}
        types={TypeCheckBoxPayload}
        provinces={ProvinceCheckBoxPayload}
      />
    </Stack>
  );
}
