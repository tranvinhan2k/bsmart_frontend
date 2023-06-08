import { Box, Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { FontFamily, FontSize, MetricSize } from '~/assets/variables';
// import Button from '~/components/atoms/Button';
import FormInput from '~/components/atoms/FormInput';
import Icon from '~/components/atoms/Icon';
import { mockLevelData, typeData } from '~/constants';
import { CREATE_SUB_COURSE_FIELDS } from '~/form/schema';
import useCRUDMentorCourse from '~/hooks/useCRUDMentorCourse';
import globalStyles from '~/styles';
import { scrollToTop } from '~/utils/common';

export default function MentorCourseDetailPage() {
  const { id } = useParams();

  const hookForm = useForm();

  const handleUpdateCourse = (updateData: any) => {
    console.log(updateData);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Box sx={{ boxShadow: 3, p: 5, borderRadius: 1 }}>
      <h1>Thông tin khóa học</h1>
    </Box>
  );
}
