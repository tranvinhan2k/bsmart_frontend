import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import feedbacksApi from '~/api/feedback';
import { useCustomMutation } from './custom/useCustomMutation';
import { useCustomQuery } from './custom/useCustomQuery';
import { PagingFilterRequest } from '~/models';
import { useTryCatch } from './useTryCatch';

export interface RequestfeedbackQuestionPayload {
  code: string;
  name: string;
}

export const useCRUDTemplate = () => {
  const key = 'template';

  const [filterParams, setFilterParams] = useState<PagingFilterRequest>({
    page: 0,
    size: 20,
    name: '',
    type: 'COURSE',
  });

  const { error, data, isLoading, refetch } = useCustomQuery(
    ['get_all_template'],
    () => feedbacksApi.getAllTemplate(filterParams)
  );

  const addTemplateMutation = useCustomMutation(
    [key],
    feedbacksApi.createTemplate
  );

  const updateTemplateMutation = useCustomMutation(
    [key],
    feedbacksApi.updateTemplate
  );

  const deleteTemplateMutation = useCustomMutation(
    [key],
    feedbacksApi.deleteTemplate
  );

  const { mutateAsync: handleChangeDefaultValue } = useCustomMutation(
    ['change_default_template'],
    feedbacksApi.setDefaultTemplate
  );

  const { handleTryCatch: handleTryCatchChangeDefaultValue } = useTryCatch(
    'Đổi bản mẫu mặc định'
  );

  return {
    error,
    templates: data,
    isLoading:
      isLoading ||
      addTemplateMutation.isLoading ||
      deleteTemplateMutation.isLoading ||
      updateTemplateMutation.isLoading,
    refetch,
    addTemplateMutation,
    deleteTemplateMutation,
    updateTemplateMutation,
    handleChangeDefaultValue,
    handleTryCatchChangeDefaultValue,
  };
};
