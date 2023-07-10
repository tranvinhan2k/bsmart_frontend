import { useTimeOut } from '../useTimeOut';

export const useMockMutation = (param: any) => {
  const { sleep } = useTimeOut(1000);

  const handleMockApi = async (params: any) => {
    await sleep();
    return param;
  };

  return {
    mutationAsync: handleMockApi,
  };
};
