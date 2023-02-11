import { lazy, Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '~/components/layouts/MainLayout';

const HomePage = lazy(() => import('~/pages/HomePage'));

export default function MainRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainLayout>
        <Routes>
          <Route index element={<Navigate to="homepage" />} />
          <Route path="homepage/*" element={<HomePage />} />
        </Routes>
      </MainLayout>
    </Suspense>
  );
}
