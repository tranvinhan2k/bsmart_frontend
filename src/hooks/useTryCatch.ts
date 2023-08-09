import { useState } from 'react';
import { Id } from 'react-toastify';
import { formatLowercaseTrimText } from '~/utils/common';
import toast from '~/utils/toast';

const initFormatTexts = {
  loading: 'Đang {{name}}...',
  error: 'Đã {{name}} thất bại',
  success: 'Đã {{name}} thành công !',
};

function replaceFeatureName(name: string | undefined, text: string) {
  return text.replace('{{name}}', formatLowercaseTrimText(name || ''));
}

export const useTryCatch = (featureName?: string) => {
  const texts = {
    loading: replaceFeatureName(featureName, initFormatTexts.loading),
    error: replaceFeatureName(featureName, initFormatTexts.error),
    success: replaceFeatureName(featureName, initFormatTexts.success),
  };
  const [error, setError] = useState<Error>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleTryCatch = async <T>(
    callback: () => Promise<T>,
    onError?: () => void
  ): Promise<T | null> => {
    setLoading(true);
    let id: Id | undefined;

    if (featureName) {
      id = toast.loadToast(texts.loading);
    }

    try {
      const response = await callback();

      if (featureName && id) {
        toast.updateSuccessToast(id, texts.success);
      }

      return response;
    } catch (e: any) {
      if (featureName && id) {
        toast.updateFailedToast(
          id,
          `${texts.error}: ${!e.message.includes('n/a') ? e.message : ''}`
        );
      }

      setError(e);

      if (onError) {
        onError();
      }
    } finally {
      setLoading(false);
    }

    return null;
  };

  return {
    error,
    isLoading,
    handleTryCatch,
  };
};
