import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LazyLoadingScreen from '~/components/atoms/LazyLoadingScreen';
import { NavigationLink } from '~/constants/routeLink';

export default function LoginGoogleSuccessPage() {
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', `${token}`);
      window.location.href = NavigationLink.homepage;
    }
  }, [token]);

  return <LazyLoadingScreen />;
}
