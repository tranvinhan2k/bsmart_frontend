import { Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { MetricSize, Color, FontFamily, FontSize } from '~/assets/variables';
import SearchBar from '~/components/atoms/SearchBar';
import FilterCheckboxListMentor from '~/components/molecules/FilterCheckboxListMentor';
import { useDispatchGetAllSubjects } from '~/hooks';
import { PagingFilterRequest } from '~/models';
import { selectFilterParams } from '~/redux/mentors/selector';
import { changeFilterParams } from '~/redux/mentors/slice';

interface Props {
  filterParams: PagingFilterRequest;
  onSearch: (searchValue: string) => void;
  onChangeSubject: (subjectIds: number[]) => void;
}

export default function MentorFilterSection({
  filterParams,
  onChangeSubject,
  onSearch,
}: Props) {
  const { optionSubjects: subjects } = useDispatchGetAllSubjects();

  const handleSubmitSearchValue = (searchValue: string) => {
    onSearch(searchValue);
  };

  const handleFilterSkills = (skills: number[]) => {
    onChangeSubject(skills);
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
      {' '}
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
      <FilterCheckboxListMentor
        skillId={filterParams.subjectId}
        skills={subjects}
        onSkills={handleFilterSkills}
      />
    </Stack>
  );
}
