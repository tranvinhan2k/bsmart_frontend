import { FieldErrors, SubmitErrorHandler } from 'react-hook-form';
import { OptionPayload } from '~/models';
import { appendLogFile } from './file';

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
