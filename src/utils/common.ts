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
