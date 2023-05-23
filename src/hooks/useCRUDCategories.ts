import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import categoriesApi from '~/api/categories';

export interface RequestCategoryPayload {
  code: string;
  name: string;
}

export const useCRUDCategories = () => {
  const key = 'category';
  const queryClient = useQueryClient();

  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAllCategoriesAllProp(),
  });

  const addCategoryMutation = useMutation({
    mutationKey: [key],
    mutationFn: categoriesApi.createCategory,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);

  const updateCategoryMutation = useMutation({
    mutationKey: [key],
    mutationFn: categoriesApi.updateCategory,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);
  const deleteCategoryMutation = useMutation({
    mutationKey: [key],
    mutationFn: categoriesApi.deleteCategory,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);
  const getOneCategoryMutation = useMutation({
    mutationKey: [key],
    mutationFn: categoriesApi.getCategory,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  } as any);
  return {
    error,
    categories: data,
    isLoading:
      isLoading ||
      addCategoryMutation.isLoading ||
      deleteCategoryMutation.isLoading ||
      updateCategoryMutation.isLoading ||
      getOneCategoryMutation.isLoading,
    refetch,
    addCategoryMutation,
    deleteCategoryMutation,
    updateCategoryMutation,
    getOneCategoryMutation,
  };
};
