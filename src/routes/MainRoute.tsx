import { lazy, Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '~/components/layouts/MainLayout';
import LoadingScreen from '~/components/LoadingScreen';

const HomePage = lazy(() => import('~/pages/HomePage'));
const IndexPage = lazy(() => import('~/pages/IndexPage'));
const AboutUsPage = lazy(() => import('~/pages/AboutUsPage'));

export default function MainRoute() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <MainLayout>
        <Routes>
          <Route index element={<Navigate to="homepage" />} />
          <Route path="homepage/*" element={<HomePage />} />
          <Route path="index/*" element={<IndexPage />} />
          <Route path="aboutus/*" element={<AboutUsPage />} />
        </Routes>
      </MainLayout>
    </Suspense>
  );
}
