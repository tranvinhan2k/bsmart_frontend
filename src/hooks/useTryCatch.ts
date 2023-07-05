import { useState } from 'react';
import { Id } from 'react-toastify';
import toast from '~/utils/toast';

export const useTryCatch = (texts?: {
  loading: string;
  success: string;
  error: string;
}) => {
  const [error, setError] = useState<Error>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleTryCatch = async (
    callback: () => Promise<any>,
    onError?: () => void
  ) => {
    let id: Id = -1;
    setLoading(true);
    if (texts) {
      id = toast.loadToast(texts?.loading);
    }
    try {
      const response = await callback();
      if (texts && id) {
        toast.updateSuccessToast(id, texts?.success);
      }
      setLoading(false);
      return response;
    } catch (e: any) {
      if (texts && id) {
        toast.updateFailedToast(id, `${texts?.error}: ${e.message}`);
      }
      setError(e);
      if (onError) {
        onError();
      }
    }
    setLoading(false);
    return null;
  };

  return {
    error,
    isLoading,
    handleTryCatch,
  };
};
