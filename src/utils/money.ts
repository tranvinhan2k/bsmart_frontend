export function formatMoney(moneyText: number, isHideText?: boolean) {
  if (!moneyText) return '0 đ';
  if (isHideText) {
    return new Intl.NumberFormat('vi-VN').format(moneyText);
  }

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(moneyText);
}
