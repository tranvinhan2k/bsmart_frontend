import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../useYupValidationResolver';
import { validationSchemaCreateCourse } from '~/form/validation';
import { defaultValueCreateCourse } from '~/form/defaultValues';
import { OptionPayload } from '~/models';
import { PostCourseRequest } from '~/models/request';
import { useGetFilteredSubjectAndCategory } from '../course/useGetFilteredSubjectAndCategory';
import { mockLevelData } from '~/constants';

export const useCreateCourseForm = (
  onChangeCourse: (param: PostCourseRequest) => void
) => {
  // const { publicCourses } = useQueryGetAllPublicCourses();

  const resolverCreateCourse = useYupValidationResolver(
    validationSchemaCreateCourse
  );
  const createCourseHookForm = useForm({
    defaultValues: defaultValueCreateCourse,
    resolver: resolverCreateCourse,
  });

  const { categories, filterSubjects } = useGetFilteredSubjectAndCategory(
    createCourseHookForm,
    'categoryId'
  );

  async function handleCreateCourse(data: {
    name: string;
    subjectId: OptionPayload;
    categoryId: OptionPayload;
    description: string;
    level: string;
  }) {
    const params: PostCourseRequest = {
      level: data.level,
      name: data?.name || '',
      subjectId: data?.subjectId.id,
      categoryId: data?.categoryId.id,
      description: data?.description || '',
    };
    await onChangeCourse(params);
  }

  return {
    // publicCourses,
    categories,
    filterSubjects,
    createCourseHookForm,
    handleCreateCourse,
    levels: mockLevelData,
  };
};
