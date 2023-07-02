import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '~/redux/user/selector';
import { updateUserCart } from '~/redux/user/slice';
import { useHandleApi } from './useHandleApi';
import accountApi from '~/api/users';

export const useDispatchProfile = () => {
  const dispatch = useDispatch();
  const { error, isLoading, handleQueryApi } = useHandleApi();

  const profile = useSelector(selectProfile);

  const handleDispatch = useCallback(async () => {
    const response = await handleQueryApi(accountApi.getTokenProfile);
    dispatch(updateUserCart(response));
  }, [dispatch, handleQueryApi]);

  return {
    profile,
    isLoading,
    handleDispatch,
    error,
  };
};
