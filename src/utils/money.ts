export function formatMoney(moneyText: number, isHideText?: boolean) {
  if (isHideText) {
    return new Intl.NumberFormat('vi-VN').format(moneyText);
  }

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(moneyText);
}
