import { useMemo, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import subjectsApi from '~/api/subjects';
import { globalCategories } from '~/redux/globalData/selector';
import { useTryCatch } from './useTryCatch';
import { updateCategories } from '~/redux/globalData/slice';
import { OptionPayload } from '~/models';
import { CategoriesPayload } from '~/models/type';
import categoriesApi from '~/api/categories';

const transformOptionData = (categories: CategoriesPayload[]) => {
  const transformData: OptionPayload[] = categories.map((item) => ({
    id: item.id,
    label: item.name,
    value: `${item.id}`,
  }));
  return transformData;
};

export const useDispatchGetAllCategories = () => {
  const dispatch = useDispatch();
  const { error, isLoading, handleTryCatch } = useTryCatch();

  const categories = useSelector(globalCategories);

  const optionCategories = useMemo(
    () => transformOptionData(categories),
    [categories]
  );

  const handleUpdateCategories = useCallback(async () => {
    const response = await handleTryCatch(
      categoriesApi.getAllCategoriesAllProp
    );
    dispatch(updateCategories(response));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    error,
    categories,
    optionCategories,
    handleUpdateCategories,
  };
};
