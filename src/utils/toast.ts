import { Id, toast } from 'react-toastify';

const loadToast = (label: string) => {
  return toast.loading(label, {
    position: 'top-left',
  });
};

const updateSuccessToast = (id: Id, label: string) => {
  toast.update(id, {
    position: 'top-left',
    render: label,
    type: 'success',
    isLoading: false,
    autoClose: 500,
    closeOnClick: true,
    closeButton: true,
  });
};
const updateFailedToast = (id: Id, label: string) => {
  toast.update(id, {
    position: 'top-left',
    render: label,
    type: 'error',
    isLoading: false,
    closeOnClick: true,
    closeButton: true,
    autoClose: 2000,
  });
};
const notifyErrorToast = (message: string) => {
  toast.error(message, {
    position: 'top-left',
    isLoading: false,
    closeOnClick: true,
    closeButton: true,
    autoClose: 2000,
  });
};
const notifyWarningToast = (message: string) => {
  toast.warning(message, {
    position: 'top-left',
    isLoading: false,
    closeOnClick: true,
    closeButton: true,
    autoClose: 1000,
  });
};
const notifySuccessToast = (message: string) => {
  toast.success(message, {
    position: 'top-left',
    isLoading: false,
    autoClose: 500,
    closeOnClick: true,
    closeButton: true,
  });
};

export default {
  loadToast,
  updateFailedToast,
  updateSuccessToast,
  notifyErrorToast,
  notifyWarningToast,
  notifySuccessToast,
};
