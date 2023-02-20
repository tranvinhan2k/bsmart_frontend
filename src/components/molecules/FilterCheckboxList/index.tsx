import { Stack, Typography } from '@mui/material';
import FilterCheckbox from './FilterCheckbox';
import { CheckBoxPayload } from '~/models';
import { FontFamily, FontSize } from '~/assets/variables';

interface FilterCheckboxListProps {
  fields: CheckBoxPayload[];
  subjects: CheckBoxPayload[];
  types: CheckBoxPayload[];
  provinces: CheckBoxPayload[];
}

export default function FilterCheckboxList({
  fields,
  provinces,
  subjects,
  types,
}: FilterCheckboxListProps) {
  return (
    <Stack padding={2}>
      <Typography
        sx={{ fontSize: FontSize.small_16, fontFamily: FontFamily.bold }}
      >
        LĨNH VỰC
      </Typography>
      <FilterCheckbox data={fields} />
      <Typography
        sx={{ fontSize: FontSize.small_16, fontFamily: FontFamily.bold }}
      >
        MÔN HỌC
      </Typography>
      <FilterCheckbox data={subjects} />
      <Typography
        sx={{ fontSize: FontSize.small_16, fontFamily: FontFamily.bold }}
      >
        HÌNH THỨC
      </Typography>
      <FilterCheckbox data={types} />
      <Typography
        sx={{ fontSize: FontSize.small_16, fontFamily: FontFamily.bold }}
      >
        KHU VỰC
      </Typography>
      <FilterCheckbox data={provinces} />
    </Stack>
  );
}
