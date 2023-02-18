import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import { FontFamilies, FontSize, MetricSize } from '~/assets/variables';
import { CourseList } from '~/constants';
import CourseItem from '~/components/molecules/CourseItem';

export default function CourseMenuSection() {
  const [dropDownValue, setDropDownValue] = useState('');

  const handleChange = (event: any) => {
    setDropDownValue(event.target.value);
  };

  return (
    <Stack sx={{ width: '100%' }}>
      <Stack
        sx={{ width: '100%' }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack flexDirection="row">
          <Typography
            sx={{
              fontFamily: FontFamilies.bold,
              fontSize: FontSize.small,
              paddingRight: MetricSize.small,
            }}
          >
            0
          </Typography>
          <Typography
            sx={{ fontFamily: FontFamilies.regular, fontSize: FontSize.small }}
          >
            Khóa học
          </Typography>
        </Stack>

        <FormControl size="small">
          <InputLabel id="demo-select-small">Sắp xếp khóa học</InputLabel>
          <Select
            sx={{ width: '200px' }}
            value={dropDownValue}
            label="Sắp xếp khóa học"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack
        sx={{
          paddingY: MetricSize.medium,
        }}
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
        alignContent="space-around"
        alignItems="center"
      >
        {CourseList.map((item) => (
          <CourseItem key={item.id} item={item} />
        ))}
      </Stack>
      <Stack justifyContent="center" alignItems="center" padding={2}>
        <Pagination count={10} />
      </Stack>
    </Stack>
  );
}
