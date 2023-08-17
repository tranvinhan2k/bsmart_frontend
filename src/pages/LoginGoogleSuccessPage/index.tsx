import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LazyLoadingScreen from '~/components/atoms/LazyLoadingScreen';
import { NavigationLink } from '~/constants/routeLink';

export default function LoginGoogleSuccessPage() {
  const { tokenId } = useParams();

  console.log('token', tokenId);

  useEffect(() => {
    if (tokenId) {
      localStorage.setItem('token', `${tokenId}`);
      // window.location.href = NavigationLink.homepage;
    }
  }, [tokenId]);

  return <LazyLoadingScreen />;
}
