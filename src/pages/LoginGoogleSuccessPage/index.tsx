import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LazyLoadingScreen from '~/components/atoms/LazyLoadingScreen';
import { NavigationLink } from '~/constants/routeLink';

export default function LoginGoogleSuccessPage() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('tokenId');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', `${token}`);
    }
  }, [token]);

  return <Navigate to={NavigationLink.homepage} />;
}
