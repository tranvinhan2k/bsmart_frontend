export const formatNumberFixedTwoDigit = (unFormatNumber: number) => {
  return unFormatNumber.toFixed(1);
};

export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const formatStringToNumber = (string: string | undefined) => {
  if (!string) return 0;
  return parseInt(`${string}`, 10);
};
