import { lazy, Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import LazyLoadingScreen from '~/components/loading/LazyLoadingScreen';
import MainLayout from '~/layouts/MainLayout';
import RegisterPage from '~/pages/RegisterPage';

const HomePage = lazy(() => import('~/pages/HomePage'));

export default function MainRoute() {
  return (
    <Suspense fallback={<LazyLoadingScreen />}>
      <MainLayout>
        <Routes>
          <Route index element={<Navigate to="homepage" />} />
          <Route path="homepage/*" element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </MainLayout>
    </Suspense>
  );
}
