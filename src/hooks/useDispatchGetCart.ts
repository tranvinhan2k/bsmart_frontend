import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cartApi from '~/api/cart';
import { selectCart } from '~/redux/user/selector';
import { updateUserCart } from '~/redux/user/slice';
import { useTryCatch } from './useTryCatch';

export const useDispatchGetCart = () => {
  const dispatch = useDispatch();
  const { error, isLoading, handleTryCatch } = useTryCatch();

  const cart = useSelector(selectCart);

  const handleDispatch = useCallback(async () => {
    const response = await handleTryCatch(cartApi.getCart);
    dispatch(updateUserCart(response));
  }, [dispatch, handleTryCatch]);

  return {
    cart,
    isLoading,
    handleDispatch,
    error,
  };
};
