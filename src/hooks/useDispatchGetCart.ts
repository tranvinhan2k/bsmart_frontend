import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cartApi from '~/api/cart';
import { selectCart } from '~/redux/user/selector';
import { updateUserCart } from '~/redux/user/slice';

export const useDispatchGetCart = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const handleDispatch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await cartApi.getCart();
      setLoading(false);
      dispatch(updateUserCart(response));
    } catch (e: any) {
      setError(e);
      setLoading(false);
      console.error('cart error', error);
    }
  }, [dispatch, error]);

  return {
    cart,
    isLoading,
    handleDispatch,
    error,
  };
};
