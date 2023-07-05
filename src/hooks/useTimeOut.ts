export const useTimeOut = (ms: number) => {
  const sleep = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const onSleep = async (param: any) => {
    await sleep();
    return param;
  };

  return {
    sleep,
    onSleep,
  };
};
