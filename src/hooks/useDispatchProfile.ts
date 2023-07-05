import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile, selectToken } from '~/redux/user/selector';
import { addProfile, logOut } from '~/redux/user/slice';
import { useTryCatch } from './useTryCatch';
import accountApi from '~/api/users';

export const useDispatchProfile = () => {
  const dispatch = useDispatch();
  const { error, isLoading, handleTryCatch } = useTryCatch();

  const profile = useSelector(selectProfile);

  const handleDispatch = useCallback(async () => {
    const response = await handleTryCatch(accountApi.getTokenProfile, () => {
      localStorage.removeItem('token');
      window.location.reload();
    });
    dispatch(addProfile({ profile: response }));
  }, [dispatch, handleTryCatch]);

  return {
    profile,
    isLoading,
    handleDispatch,
    error,
  };
};
