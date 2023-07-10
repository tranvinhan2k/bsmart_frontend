import { FieldErrors, SubmitErrorHandler } from 'react-hook-form';
import { OptionPayload } from '~/models';
import { SectionPayload } from '~/models/section';
import { ContentPayload } from '~/models/type';

export function scrollToTop() {
  window.scrollTo({
    behavior: 'smooth',
    left: 0,
    top: 0,
  });
}

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
    id: params.id,
    label: params.name,
    value: params.code,
    categoryIds: params.categoryIds,
  };
}

export function formatToLocalContent(params: {
  id: number;
  name: string;
  lessons: {
    description: string;
  }[];
}): SectionPayload {
  return {
    id: params.id,
    name: params.name,
    modules: (params.lessons as any[]).map((subItem) => ({
      id: subItem.id,
      name: subItem.description,
    })),
  };
}
