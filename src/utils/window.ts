import toast from './toast';

export function openUrl(link: string) {
  if (link) {
    window.open(link, '_blank');
  } else {
    toast.notifyErrorToast('Không thể mở trang này.');
  }
}
