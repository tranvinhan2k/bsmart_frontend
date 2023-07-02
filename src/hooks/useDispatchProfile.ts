import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '~/redux/user/selector';
import { addProfile } from '~/redux/user/slice';
import { useHandleApi } from './useHandleApi';
import accountApi from '~/api/users';

export const useDispatchProfile = () => {
  const dispatch = useDispatch();
  const { error, isLoading, handleQueryApi } = useHandleApi();

  const profile = useSelector(selectProfile);

  const handleDispatch = useCallback(async () => {
    const response = await handleQueryApi(accountApi.getTokenProfile);
    dispatch(addProfile({ profile: response }));
  }, [dispatch, handleQueryApi]);

  return {
    profile,
    isLoading,
    handleDispatch,
    error,
  };
};
