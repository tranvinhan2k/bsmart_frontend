import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cartApi from '~/api/cart';
import { selectCart } from '~/redux/user/selector';
import { updateUserCart } from '~/redux/user/slice';
import { useHandleApi } from './useHandleApi';

export const useDispatchGetCart = () => {
  const dispatch = useDispatch();
  const { error, isLoading, handleQueryApi } = useHandleApi();

  const cart = useSelector(selectCart);

  const handleDispatch = useCallback(async () => {
    const response = await handleQueryApi(cartApi.getCart);
    dispatch(updateUserCart(response));
  }, [dispatch, handleQueryApi]);

  return {
    cart,
    isLoading,
    handleDispatch,
    error,
  };
};
