import { UseFormReturn } from 'react-hook-form';
import {
  useDispatchGetAllSubjects,
  useGetMentorCategories,
  useQueryGetAllMentorSubjects,
} from '~/hooks';

export const useGetFilteredSubjectAndCategory = (
  hookForm: UseFormReturn,
  name: string
) => {
  const categoryWatch = hookForm.watch(name);
  const { data: categories } = useGetMentorCategories();
  const { subjects } = useQueryGetAllMentorSubjects();

  return {
    filterSubjects: subjects,
    categories,
  };
};
