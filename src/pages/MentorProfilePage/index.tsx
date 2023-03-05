import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MentorProfileLayout from '~/layouts/MentorProfileLayout';
import { RoutePayload } from '~/models/routes';
import { mentorRoutes } from '~/routes';
import { scrollToTop } from '~/utils/common';

export default function MentorProfilePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const showMentorRoutes = () => {
    let result = null;

    if (mentorRoutes.length > 0) {
      result = mentorRoutes.map((route: RoutePayload) => {
        return (
          <Route key={route.path} path={route.path} element={route?.main()} />
        );
      });
    }

    return result;
  };

  return (
    <MentorProfileLayout>
      <Routes>{showMentorRoutes()}</Routes>
    </MentorProfileLayout>
  );
}
