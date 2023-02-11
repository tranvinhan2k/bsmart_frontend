import { lazy, Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '~/components/layouts/MainLayout';
import LoadingScreen from '~/components/LoadingScreen';

const HomePage = lazy(() => import('~/pages/HomePage'));

export default function MainRoute() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <MainLayout>
        <Routes>
          <Route index element={<Navigate to="homepage" />} />
          <Route path="homepage/*" element={<HomePage />} />
        </Routes>
      </MainLayout>
    </Suspense>
  );
}
