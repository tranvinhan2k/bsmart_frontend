import { useForm } from 'react-hook-form';
import { DetailCoursePayload } from '~/pages/MentorCourseDetailPage';
import { validationSchemaCreateCourse } from '~/form/validation';
import { useYupValidationResolver } from '../useYupValidationResolver';
import { OptionPayload, PutCoursePayload } from '~/models';
import { useGetFilteredSubjectAndCategory } from '../course/useGetFilteredSubjectAndCategory';

export const useUpdateCourseForm = (
  course: DetailCoursePayload,
  onChangeCourse: (data: PutCoursePayload) => void
) => {
  const resolverUpdateCourse = useYupValidationResolver(
    validationSchemaCreateCourse
  );
  const hookForm = useForm({
    defaultValues: course,
    resolver: resolverUpdateCourse,
  });
  const { categories, filterSubjects } = useGetFilteredSubjectAndCategory(
    hookForm,
    'categoryId'
  );

  async function handleSubmit(data: {
    name: string;
    subjectId: OptionPayload;
    categoryId: OptionPayload;
    description: string;
  }) {
    const params: PutCoursePayload = {
      name: data?.name || '',
      subjectId: data?.subjectId.id,
      categoryId: data?.categoryId.id,
      description: data?.description || '',
    };
    await onChangeCourse(params);
  }

  return {
    hookForm,
    categories,
    filterSubjects,
    handleSubmit,
  };
};
