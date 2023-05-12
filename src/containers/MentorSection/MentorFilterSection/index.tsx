import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '~/components/atoms/SearchBar';
import FilterCheckboxListMentor from '~/components/molecules/FilterCheckboxListMentor';
import { useQueryGetAllSubjects } from '~/hooks';
import { selectFilterParams } from '~/redux/mentors/selector';
import { changeFilterParams } from '~/redux/mentors/slice';

export default function MentorFFilterSection() {
  const dispatch = useDispatch();
  const filterParams = useSelector(selectFilterParams);
  const { subjects } = useQueryGetAllSubjects();

  const handleSubmitSearchValue = (searchValue: string) => {
    dispatch(changeFilterParams({ ...filterParams, q: searchValue }));
  };

  const handleFilterSkills = (skills: number[]) => {
    dispatch(changeFilterParams({ ...filterParams, skills }));
  };

  return (
    <Stack marginX={2}>
      <SearchBar
        value={filterParams.q || ''}
        color="black"
        placeholder="Tìm kiếm ..."
        onSubmit={handleSubmitSearchValue}
      />
      <FilterCheckboxListMentor
        skillId={filterParams.skills}
        skills={subjects}
        onSkills={handleFilterSkills}
      />
    </Stack>
  );
}
