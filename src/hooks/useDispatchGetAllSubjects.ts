import { useMemo, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import subjectsApi from '~/api/subjects';
import { globalSubjects } from '~/redux/globalData/selector';
import { useTryCatch } from './useTryCatch';
import { updateSubjects } from '~/redux/globalData/slice';
import { OptionPayload } from '~/models';
import { SubjectPayload } from '~/models/type';

const transformOptionData = (subjects: SubjectPayload[]) => {
  const transformData: OptionPayload[] = subjects.map((item) => ({
    id: item.id,
    label: item.name,
    value: `${item.id}`,
    categoryIds: item.categoryIds,
  }));
  return transformData;
};

export const useDispatchGetAllSubjects = () => {
  const dispatch = useDispatch();
  const { error, isLoading, handleTryCatch } = useTryCatch();

  const subjects = useSelector(globalSubjects);

  const optionSubjects = useMemo(
    () => transformOptionData(subjects),
    [subjects]
  );

  const handleUpdateSubjects = useCallback(async () => {
    const response = await handleTryCatch(subjectsApi.getAllSubjectsAllProp);
    dispatch(updateSubjects(response));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    error,
    subjects,
    optionSubjects,
    handleUpdateSubjects,
  };
};
