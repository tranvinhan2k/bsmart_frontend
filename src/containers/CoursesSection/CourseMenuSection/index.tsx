import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import { Color, FontFamily, FontSize, MetricSize } from '~/assets/variables';
import { CourseList } from '~/constants';
import CourseItem from '~/components/molecules/CourseItem';

export default function CourseMenuSection() {
  const navigation = useNavigate();
  const [dropDownValue, setDropDownValue] = useState('');

  const handleChange = (event: any) => {
    setDropDownValue(event.target.value);
  };

  const handleNavigateCourseDetail = (id: string) => {
    navigation(`course-detail/${id}`);
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
              fontFamily: FontFamily.bold,
              fontSize: FontSize.small_16,
              paddingRight: MetricSize.small_5,
            }}
          >
            {CourseList.length}
          </Typography>
          <Typography
            sx={{ fontFamily: FontFamily.regular, fontSize: FontSize.small_16 }}
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
            <MenuItem value={10}>Khóa học mới nhất</MenuItem>
            <MenuItem value={20}>Khóa học nhiều người học</MenuItem>
            <MenuItem value={30}>Khóa học sắp bắt đầu</MenuItem>
            <MenuItem value={40}>A - Z</MenuItem>
            <MenuItem value={50}>Z - A</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack
        sx={{
          paddingY: MetricSize.medium_15,
        }}
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
        alignContent="space-around"
        alignItems="center"
      >
        {CourseList.map((item) => (
          <CourseItem
            key={item.id}
            item={item}
            onClick={() => handleNavigateCourseDetail(`${item.id}`)}
          />
        ))}
      </Stack>
      <Stack justifyContent="center" alignItems="center" padding={2}>
        <Pagination size="large" count={10} />
      </Stack>
    </Stack>
  );
}
