import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminProfileLayout from '~/layouts/AdminProfileLayout';
import { RoutePayload } from '~/models/routes';
import { adminRoutes } from '~/routes';
import { scrollToTop } from '~/utils/common';

export default function AdminProfilePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const showAdminRoutes = () => {
    let result = null;

    if (adminRoutes.length > 0) {
      result = adminRoutes.map((route: RoutePayload) => {
        return (
          <Route key={route.path} path={route.path} element={route?.main()} />
        );
      });
    }

    return result;
  };

  return (
    <AdminProfileLayout>
      <Routes>{showAdminRoutes()}</Routes>
    </AdminProfileLayout>
  );
}
