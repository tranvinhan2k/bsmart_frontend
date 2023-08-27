import { FieldErrors, SubmitErrorHandler } from 'react-hook-form';
import { TRY_CATCH_AXIOS_DEFAULT_ERROR } from '~/form/message';
import { OptionPayload } from '~/models';
import { RevenuePayload } from '~/pages/admin/AdminManagerRevenuePage/RevenueChart';

export function scrollToTop() {
  window.scrollTo({
    behavior: 'smooth',
    left: 0,
    top: 0,
  });
}

export const generateMockApi = <T>(params: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(params);
    }, 500);
  });
};

export function delay(time?: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, time);
  });
}

interface MyHashMap {
  [key: string]: number;
}

export function isHashMap(property: any): property is MyHashMap {
  return typeof property === 'object' && property !== null;
}

export function changeArrayToHashmap(hashmap: any) {
  return Object.entries(hashmap).map(([key, value]) => {
    return { key, value };
  });
}

export function getGender(genderCode?: string) {
  let result;
  switch (genderCode) {
    case 'MALE':
      result = 'Nam';
      break;
    case 'FEMALE':
      result = 'Nữ';
      break;
    default:
      result = 'Khác';
      break;
  }
  return result;
}

export function formatUndefinedValue(
  value: any,
  type?: 'string' | 'number' | 'boolean' | 'array'
) {
  switch (type) {
    case 'string':
      return '';
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'array':
      return [];
    default:
      return null;
  }
}

export const handleConsoleError: SubmitErrorHandler<any> = (
  errors: FieldErrors<any>
) => {
  // eslint-disable-next-line no-console
  console.error('console error', errors);
  return null;
};

export function formatLowercaseTrimText(text: string) {
  return text.toLowerCase().trim();
}

export function formatOptionPayload(params: {
  id: number;
  code: string;
  name: string;
  categoryIds?: number[];
}): OptionPayload {
  return {
    id: params?.id,
    label: params?.name,
    value: params?.code,
    categoryIds: params.categoryIds,
  };
}

export const handleDefinedText = (
  text: string | number | undefined | null
): string | number => {
  if (text) return text;
  if (text === undefined) return 'Không tồn tại';
  return 'Đã xảy ra lỗi';
};

export const restrictNumberDisplay = (
  input: number | undefined
): string | number => {
  if (input === undefined) return 0;
  if (input > 999) return '999+';
  return input;
};

export const formatError = (e: string) => {
  // await appendLogFile(e);

  const defaultMessage = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';

  if (e.includes('n/a')) {
    return defaultMessage;
  }

  return e;
};

export function convertToHigherByteUnit(kb: number): string {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let value = kb;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(2)} ${units[unitIndex]}`;
}

function generateRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export function generateRandomData(numItems: number): RevenuePayload[] {
  const newData: RevenuePayload[] = [];
  const buyers = ['Nhan Tran', 'John Doe', 'Jane Smith'];
  const startDate = new Date(2020, 0, 1);
  const endDate = new Date(2024, 11, 31);

  for (let i = 0; i < numItems; i += 1) {
    const id = newData.length + i;
    const date = generateRandomDate(startDate, endDate).toISOString();
    const revenue = Math.floor(Math.random() * 100) + 1; // Random revenue between 1 and 100
    const total = Math.floor(Math.random() * 500) + 1; // Random total between 1 and 500
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];

    newData.push({ id, date, revenue, total, buyer });
  }

  return newData;
}

export const toastMsgError = (error: unknown): string => {
  let msg = TRY_CATCH_AXIOS_DEFAULT_ERROR;
  if (typeof error === 'string') {
    msg = error;
  }
  if (error instanceof Error) {
    msg = error.message;
  }
  return msg;
};

export const handleViewImgFromUrl = (link: string | undefined) => {
  if (typeof link === 'string') window.open(link, '_blank');
};
