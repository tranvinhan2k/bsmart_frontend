import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MemberProfileLayout from '~/layouts/MemberProfileLayout';
import { RoutePayload } from '~/models/routes';
import { memberRoutes } from '~/routes';
import { scrollToTop } from '~/utils/common';

export default function MemberProfilePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const showMemberRoutes = () => {
    let result = null;

    if (memberRoutes.length > 0) {
      result = memberRoutes.map((route: RoutePayload) => {
        return (
          <Route key={route.path} path={route.path} element={route?.main()} />
        );
      });
    }

    return result;
  };

  return (
    <MemberProfileLayout>
      <Routes>{showMemberRoutes()}</Routes>
    </MemberProfileLayout>
  );
}
