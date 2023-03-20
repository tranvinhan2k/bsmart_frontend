import { Id, toast } from 'react-toastify';

const loadToast = (label: string) => {
  return toast.loading(label);
};

const updateSuccessToast = (id: Id, label: string) => {
  toast.update(id, {
    render: label,
    type: 'success',
    isLoading: false,
    autoClose: 5000,
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
    autoClose: 10000,
  });
};
const notifyErrorToast = (message: string) => {
  toast.error(message, {
    isLoading: false,
    closeOnClick: true,
    closeButton: true,
    autoClose: 10000,
  });
};

export default {
  loadToast,
  updateFailedToast,
  updateSuccessToast,
  notifyErrorToast,
};
