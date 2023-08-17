import { useEffect } from 'react';
import LazyLoadingScreen from '~/components/atoms/LazyLoadingScreen';

export default function LoginGoogleSuccessPage() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('tokenId');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', `${token}`);
      // window.location.href = NavigationLink.homepage;
    }
  }, [token]);

  return <LazyLoadingScreen />;
}
