import { Grid, Stack, Drawer } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { scrollToTop } from '~/utils/common';
import { Color } from '~/assets/variables';
import {
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import Sidebar from './Sidebar';
import { mentorClassRoutes } from '~/routes/mentor/class/routes';
import ClassHeader from '~/components/molecules/header/ClassHeader';
import { ClassContextProvider } from '~/HOCs';
import { ClassContext } from '~/HOCs/context/ClassContext';

export interface DetailMemberClassPayload {
  code: string;
  courseName: string;
  courseId: number;
}

export default function MentorClassDetailPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { detailClass, refetch } = useContext(ClassContext);
  console.log('detail class', detailClass);

  const memberClass: DetailMemberClassPayload = {
    code: detailClass?.code || '',
    courseName: detailClass?.name || '',
    courseId: detailClass?.id || 0,
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleClose = () => {
    setOpen(!open);
  };

  const showRoutes = () => {
    let result = null;

    result = mentorClassRoutes(23).map((route) => {
      return (
        <Route key={route.path} path={route.path} element={route.main()} />
      );
    });

    return result;
  };

  const returnClassList = () => {
    navigate(
      `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_class_list}`
    );
  };

  return (
    <Stack>
      <ClassContextProvider>
        <ClassHeader
          onCloseDrawerMenu={handleClose}
          onReturnClassList={returnClassList}
        />
        <Grid container sx={{ background: Color.white4, minHeight: '100vh' }}>
          <Grid
            sx={{
              paddingY: 2,
              background: Color.white,
              borderRight: '1px solid #ddd',
              display: { xs: 'none', md: 'flex' },
            }}
            item
            xs={12}
            md={2}
          >
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={10} paddingY={2} paddingX={4}>
            <Routes>{showRoutes()}</Routes>
          </Grid>
        </Grid>
        <Drawer open={open} onClose={handleClose}>
          <Stack paddingRight={2}>
            <Sidebar />
          </Stack>
        </Drawer>
      </ClassContextProvider>
    </Stack>
  );
}
