import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useGetMentorCategories, useQueryGetAllMentorSubjects } from '~/hooks';

export const useGetFilteredSubjectAndCategory = (
  hookForm: UseFormReturn,
  name: string
) => {
  const categoryWatch = hookForm.watch(name);
  const { data: categories } = useGetMentorCategories();
  const { subjects, refetch } = useQueryGetAllMentorSubjects();

  const filterSubjects = subjects?.filter((item) =>
    item.categoryIds?.includes(categoryWatch.id)
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryWatch]);

  return {
    filterSubjects,
    categories,
  };
};
