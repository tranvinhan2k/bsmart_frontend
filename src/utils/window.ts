import toast from './toast';

let browser: Window | null;

export function openUrl(link: string) {
  if (link) {
    browser = window.open(link, '_blank');
  } else {
    toast.notifyErrorToast('Không thể mở trang này.');
  }
}

export function openNewBrowserUrl(link: string) {
  if (link) {
    browser = window.open(link, '_blank', 'location=yes,height=500,width=500');
  }
  toast.notifyErrorToast('Không thể mở trang này.');
}

export function closeUrl() {
  if (browser) {
    browser.close();
  } else {
    toast.notifyErrorToast('Không thể tắt trang này.');
  }
}
