import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ManagerProfileLayout from '~/layouts/ManagerProfileLayout';
import { RoutePayload } from '~/models/routes';
import { managerRoutes } from '~/routes';
import { scrollToTop } from '~/utils/common';

export default function ManagerProfilePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const showManagerRoutes = () => {
    let result = null;

    if (managerRoutes.length > 0) {
      result = managerRoutes.map((route: RoutePayload) => {
        return (
          <Route key={route.path} path={route.path} element={route?.main()} />
        );
      });
    }

    return result;
  };

  return (
    <ManagerProfileLayout>
      <Routes>{showManagerRoutes()}</Routes>
    </ManagerProfileLayout>
  );
}
