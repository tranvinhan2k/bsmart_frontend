import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ReturnLink from '~/components/atoms/ReturnLink';
import { NavigationLink } from '~/constants/routeLink';
import { selectCheckoutItem } from '~/redux/courses/selector';
import { addCheckoutItem } from '~/redux/courses/slice';
import globalStyles from '~/styles';

export default function PaymentReport() {
  const checkOutItem = useSelector(selectCheckoutItem);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(
        addCheckoutItem({
          checkOutCourses: undefined,
          totalAmount: 0,
        })
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checkOutItem === null) {
    return <Navigate to={`/${NavigationLink.homepage}`} />;
  }

  return (
    <Stack
      padding={4}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack sx={globalStyles.viewRoundedWhiteBody}>
        <Typography sx={globalStyles.textTitle}>
          Thanh toán đơn hàng thành công
        </Typography>
        <Typography marginTop={1} sx={globalStyles.textSubTitle}>
          Chúc mừng bạn đã thanh toán đơn hàng thành công
        </Typography>
        <ReturnLink to={`/${NavigationLink.homepage}`} />
      </Stack>
    </Stack>
  );
}
