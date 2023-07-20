export const formatPhoneNumberVi = (inputPhone: string) => {
  if (inputPhone) {
    const sliced1 = inputPhone.slice(0, 3);
    const sliced2 = inputPhone.slice(3, 6);
    const sliced3 = inputPhone.slice(6);
    return `${sliced1}-${sliced2}-${sliced3}`;
  }
  return 'Đã xảy ra lỗi';
};
