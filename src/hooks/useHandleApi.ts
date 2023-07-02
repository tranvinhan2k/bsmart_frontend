import { useState } from 'react';
import { Id } from 'react-toastify';
import toast from '~/utils/toast';

export const useHandleApi = (texts?: {
  loading: string;
  success: string;
  error: string;
}) => {
  const [error, setError] = useState<Error>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleQueryApi = async (callback: () => Promise<any>) => {
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
      return response;
    } catch (e: any) {
      if (texts && id) {
        toast.updateFailedToast(id, `${texts?.error}: ${e.message}`);
      }
      setError(e);
    }
    setLoading(false);
    return null;
  };

  return {
    error,
    isLoading,
    handleQueryApi,
  };
};
