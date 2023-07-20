import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavigationLink } from '~/constants/routeLink';
import { logOut } from '~/redux/user/slice';
import toast from '~/utils/toast';

export const useLogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHookLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    dispatch(logOut());
    navigate(`/${NavigationLink.homepage}`);
    toast.notifySuccessToast('Đăng xuất thành công');
  };

  return {
    handleHookLogOut,
  };
};
