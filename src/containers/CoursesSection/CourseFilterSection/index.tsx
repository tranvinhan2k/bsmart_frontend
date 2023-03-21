import { Stack } from '@mui/material';
import { RequestGetCoursePayload } from '~/api/courses';
import SearchBar from '~/components/atoms/SearchBar';
import FilterCheckboxList from '~/components/molecules/FilterCheckboxList';
import { ProvinceOptionPayload, TypeOptionPayload } from '~/constants';
import { useQueryGetAllCategories, useQueryGetAllSubjects } from '~/hooks';

interface CourseFilterSectionProps {
  filter: RequestGetCoursePayload;
  onFilter: (params: RequestGetCoursePayload) => void;
}

export default function CourseFFilterSection(props: CourseFilterSectionProps) {
  const { categories } = useQueryGetAllCategories();
  const { subjects } = useQueryGetAllSubjects();

  const { filter, onFilter } = props;

  const handleSubmitSearchValue = (searchValue: string) => {
    onFilter({ ...filter, q: searchValue });
  };

  const handleFilterFields = (categoryId: number[]) => {
    onFilter({ ...filter, categoryId });
  };
  const handleFilterSubjects = (subjectId: number[]) => {
    onFilter({ ...filter, subjectId });
  };
  const handleFilterTypes = (types: number[]) => {
    onFilter({ ...filter, types });
  };
  const handleFilterProvinces = (provinces: number[]) => {
    onFilter({ ...filter, provinces });
  };

  return (
    <Stack marginX={2}>
      <SearchBar
        color="black"
        placeholder="Tìm kiếm ..."
        onSubmit={handleSubmitSearchValue}
      />
      <FilterCheckboxList
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
  );
}
