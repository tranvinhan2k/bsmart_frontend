import { useForm } from 'react-hook-form';
import { DetailCoursePayload } from '~/pages/MentorCourseDetailPage';
import { useDispatchGetAllCategories } from '../useDispatchGetAllCategories';
import { useDispatchGetAllSubjects } from '../useDispatchGetAllSubjects';
import { validationSchemaCreateCourse } from '~/form/validation';
import { useYupValidationResolver } from '../useYupValidationResolver';
import { OptionPayload } from '~/models';
import { SelectedCoursePayload } from '~/pages/MentorCreateCoursePage';

export const useUpdateCourseForm = (
  course: DetailCoursePayload,
  onChangeCourse: (data: SelectedCoursePayload) => void
) => {
  const { optionCategories } = useDispatchGetAllCategories();
  const { optionSubjects } = useDispatchGetAllSubjects();

  const resolverUpdateCourse = useYupValidationResolver(
    validationSchemaCreateCourse
  );
  const hookForm = useForm({
    defaultValues: course,
    resolver: resolverUpdateCourse,
  });

  async function handleUpdateCourse(data: {
    name: string;
    subjectId: OptionPayload;
    categoryId: OptionPayload;
    description: string;
  }) {
    const params: SelectedCoursePayload = {
      name: data?.name || '',
      subjectId: data?.subjectId.id,
      categoryId: data?.categoryId.id,
      description: data?.description || '',
    };
    await onChangeCourse(params);
  }

  return {
    hookForm,
    optionCategories,
    optionSubjects,
    handleUpdateCourse,
  };
};
