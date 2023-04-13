import { Stack } from '@mui/material';
import FilterCheckboxMentor from './FilterCheckboxMentor';
import { OptionPayload } from '~/models';

interface FilterCheckboxMentorListProps {
  skillId: number[] | undefined;

  skills: OptionPayload[] | undefined;

  onSkills: (data: number[]) => void;
}

export default function FilterCheckboxMentorList({
  skillId,
  skills,
  onSkills,
}: FilterCheckboxMentorListProps) {
  return (
    <Stack marginTop={1}>
      <FilterCheckboxMentor
        value={skillId}
        label="MÔN HỌC"
        data={skills}
        onChange={onSkills}
      />
    </Stack>
  );
}
