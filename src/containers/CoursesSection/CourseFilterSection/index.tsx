import { Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import SearchBar from '~/components/atoms/SearchBar';
import FilterCheckboxList from '~/components/molecules/FilterCheckboxList';
import {
  useDispatchGetAllCategories,
  useDispatchGetAllSubjects,
} from '~/hooks';
import { selectFilterParams } from '~/redux/courses/selector';
import { changeFilterParams } from '~/redux/courses/slice';

export default function CourseFilterSection() {
  const dispatch = useDispatch();
  const filterParams = useSelector(selectFilterParams);
  const { optionCategories: categories } = useDispatchGetAllCategories();
  const { optionSubjects } = useDispatchGetAllSubjects();

  const handleSubmitSearchValue = (searchValue: string) => {
    dispatch(changeFilterParams({ ...filterParams, q: searchValue }));
  };

  const handleFilterFields = (categoryId: number[]) => {
    dispatch(changeFilterParams({ ...filterParams, categoryId }));
  };
  const handleFilterSubjects = (subjectId: number[]) => {
    dispatch(changeFilterParams({ ...filterParams, subjectId }));
  };

  return (
    <Stack
      sx={{
        transition: 'all 1s ease',
        zIndex: 9,
        marginX: 1,
        marginBottom: MetricSize.small_10,
        padding: 2,
        borderRadius: MetricSize.small_5,
        background: Color.white,
        boxShadow: 1,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: FontFamily.bold,
            fontSize: FontSize.small_18,
          }}
        >
          Bộ lọc
        </Typography>
      </Stack>
      <SearchBar
        value={filterParams.q || ''}
        color="black"
        placeholder="Tìm kiếm ..."
        onSubmit={handleSubmitSearchValue}
      />
      <Stack marginTop={2}>
        <FilterCheckboxList
          categoryId={filterParams.categoryId}
          subjectId={filterParams.subjectId}
          fields={categories}
          subjects={optionSubjects}
          onFields={handleFilterFields}
          onSubjects={handleFilterSubjects}
        />
      </Stack>
    </Stack>
  );
}
