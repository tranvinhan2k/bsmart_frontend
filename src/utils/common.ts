export function scrollToTop() {
  window.scrollTo(0, 0);
}

export function delay(time?: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, time);
  });
}

export default {};
