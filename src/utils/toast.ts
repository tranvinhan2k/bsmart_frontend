import { Id, toast } from "react-toastify"

const loadToast = (label: string) => {
    return toast.loading(label);
}

const updateSuccessToast = (id: Id, label: string) => {
<<<<<<< Updated upstream
    toast.update(id, { render: label, type: 'success', isLoading: false, autoClose: 5000 })
}
const updateFailedToast = (id: Id, label: string) => {
    toast.update(id, { render: label, type: 'error', isLoading: false, closeOnClick: true })
}
=======
  toast.update(id, {
    render: label,
    type: 'success',
    isLoading: false,
    closeOnClick: true,
    closeButton: true,
    autoClose: 5000,
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
>>>>>>> Stashed changes

export default {
    loadToast,
    updateFailedToast,
    updateSuccessToast,
}