import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '~/components/atoms/SearchBar';
import FilterCheckboxList from '~/components/molecules/FilterCheckboxList';
import { ProvinceOptionPayload, TypeOptionPayload } from '~/constants';
import { useQueryGetAllCategories, useQueryGetAllSubjects } from '~/hooks';
import { selectFilterParams } from '~/redux/courses/selector';
import { changeFilterParams } from '~/redux/courses/slice';

export default function CourseFFilterSection() {
  const dispatch = useDispatch();
  const filterParams = useSelector(selectFilterParams);
  const { categories } = useQueryGetAllCategories();
  const { subjects } = useQueryGetAllSubjects();

  const handleSubmitSearchValue = (searchValue: string) => {
    dispatch(changeFilterParams({ ...filterParams, q: searchValue }));
  };

  const handleFilterFields = (categoryId: number[]) => {
    dispatch(changeFilterParams({ ...filterParams, categoryId }));
  };
  const handleFilterSubjects = (subjectId: number[]) => {
    dispatch(changeFilterParams({ ...filterParams, subjectId }));
  };
  const handleFilterTypes = (types: number[]) => {
    dispatch(changeFilterParams({ ...filterParams, types }));
  };
  const handleFilterProvinces = (provinces: number[]) => {
    dispatch(changeFilterParams({ ...filterParams, provinces }));
  };

  return (
    <Stack marginX={2}>
      <SearchBar
        value={filterParams.q || ''}
        color="black"
        placeholder="Tìm kiếm ..."
        onSubmit={handleSubmitSearchValue}
      />
      <Stack marginTop={2}>
        <FilterCheckboxList
          type={filterParams.types}
          categoryId={filterParams.categoryId}
          subjectId={filterParams.subjectId}
          fields={categories}
          subjects={subjects}
          types={TypeOptionPayload}
          provinces={ProvinceOptionPayload}
          onFields={handleFilterFields}
          onSubjects={handleFilterSubjects}
          onTypes={handleFilterTypes}
          onProvinces={handleFilterProvinces}
        />
      </Stack>
    </Stack>
  );
}
