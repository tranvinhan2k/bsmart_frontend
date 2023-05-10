import { Id, toast } from 'react-toastify';

const loadToast = (label: string) => {
  return toast.loading(label);
};

const updateSuccessToast = (id: Id, label: string) => {
  toast.update(id, {
    render: label,
    type: 'success',
    isLoading: false,
    autoClose: 1000,
    closeOnClick: true,
    closeButton: true,
  });
};
const updateFailedToast = (id: Id, label: string) => {
  toast.update(id, {
    render: label,
    type: 'error',
    isLoading: false,
    closeOnClick: true,
    closeButton: true,
    autoClose: 5000,
  });
};
const notifyErrorToast = (message: string) => {
  toast.error(message, {
    isLoading: false,
    closeOnClick: true,
    closeButton: true,
    autoClose: 5000,
  });
};
const notifyWarningToast = (message: string) => {
  toast.warning(message, {
    isLoading: false,
    closeOnClick: true,
    closeButton: true,
    autoClose: 2000,
  });
};
const notifySuccessToast = (message: string) => {
  toast.success(message, {
    isLoading: false,
    autoClose: 1000,
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
