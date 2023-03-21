const { localStorage } = window;
export type LocalStorageItemKeys = 'token' | 'role';

export function getItem(key: LocalStorageItemKeys) {
  return localStorage.getItem(key);
}

export function setItem(key: LocalStorageItemKeys, value: string) {
  return localStorage.setItem(key, value);
}
