import * as React from 'react';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';

import { ActionPayload } from '~/models';
import { MentorDashboardNavigationActionData } from '~/routes/navigators';

export default function DashboardBreadcrumbNavigation() {
  const { pathname, state } = useLocation();

  const splitPathname = pathname?.replace('/', '')?.split('/');

  if (
    splitPathname?.[1]?.includes(
      MentorDashboardNavigationActionLink.mentor_menu_dashboard
    )
  ) {
    return null;
  }
  const item = splitPathname[1];
  let routeData: ActionPayload | undefined;
  let rootRouteData: ActionPayload | undefined;
  MentorDashboardNavigationActionData.map((route) => {
    if (route.link === item) {
      routeData = route;
    } else if (route.items) {
      route.items.map((subRoute) => {
        if (subRoute.link === item) {
          routeData = subRoute;
          rootRouteData = route;
        }
        return null;
      });
    }
    return null;
  });

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {rootRouteData && (
        <Link
          key={item}
          underline="hover"
          color="inherit"
          href={`/${NavigationLink.dashboard}/${rootRouteData.link}`}
        >
          {rootRouteData.name}
        </Link>
      )}
      {routeData && (
        <Link
          key={item}
          underline="hover"
          color="inherit"
          href={`/${NavigationLink.dashboard}/${routeData.link}`}
        >
          {routeData.name}
        </Link>
      )}
    </Breadcrumbs>
  );
}
