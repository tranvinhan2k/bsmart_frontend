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
  const handleSubmitSearchValue = () => {};
  return (
    <Stack marginX={2}>
      <SearchBar
        color="black"
        placeholder="Tìm kiếm ..."
        onSubmit={handleSubmitSearchValue}
      />
      <FilterCheckboxList
        fields={FieldCheckBoxPayload}
        subjects={SubjectCheckBoxPayload}
        types={TypeCheckBoxPayload}
        provinces={ProvinceCheckBoxPayload}
      />
    </Stack>
  );
}
