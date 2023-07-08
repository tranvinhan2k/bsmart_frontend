import { useEffect } from 'react';
import { useTimeOut } from '../useTimeOut';
import { useTryCatch } from '../useTryCatch';

export const useMockQuery = (param: any) => {
  const { error, isLoading, handleTryCatch } = useTryCatch();
  const { onSleep } = useTimeOut(1000);

  useEffect(() => {
    async function handleGetAll() {
      await handleTryCatch(() => onSleep(true));
    }
    handleGetAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    error,
    isLoading,
    data: param,
  };
};
