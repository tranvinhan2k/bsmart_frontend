import { Button, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { changeUserStatus } from '~/redux/user/slice';
import { selectUserStatus } from '~/redux/user/selector';
import accountApi from '~/api/users';
import { UserPayload } from '~/models/user';
import { MetricSize } from '~/assets/variables';

export default function TestSection() {
  const dispatch = useDispatch();
  const isUser = useSelector(selectUserStatus);
  // Access the client
  const queryClient = useQueryClient();
  // Queries
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: accountApi.get,
  });
  // Mutations
  const mutation = useMutation({
    mutationFn: accountApi.get,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  const [users, setUsers] = useState<UserPayload[]>();
  const handleClick = () => {
    dispatch(changeUserStatus(!isUser));
  };
  const handleClickMutation = async () => {
    try {
      const response = await mutation.mutateAsync();
      setUsers(response);
    } catch (e: any) {
      console.error(e.message);
    }
  };
  return (
    <Stack width="90%" padding={2}>
      <Stack>
        <Typography>Update redux </Typography>
        <Typography>{`${isUser}`}</Typography>
        <Stack padding={MetricSize.medium_15}>
          <Button onClick={handleClick} variant="contained">
            Update User Status
          </Button>
        </Stack>
      </Stack>
      <Grid container sx={{ minHeight: '200vh', padding: MetricSize.medium_15 }}>
        <Grid item xl={6}>
          <>
            {isLoading && <p>Is Loading ..</p>}
            {error && <p>{`${error}`}</p>}
            <Stack
              sx={{
                border: '1px solid black',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {data &&
                data.map((item: UserPayload) => (
                  <Stack key={item.id}>
                    <p>{`${item.firstName}`}</p>
                    <p>{`${item.lastName}`}</p>
                    <p>{`${item.id}`}</p>
                    <p>{`${item.note}`}</p>
                  </Stack>
                ))}
            </Stack>
          </>
        </Grid>
        <Grid item xl={6}>
          <>
            {isLoading && <p>Is Loading ..</p>}
            {error && <p>{`${error}`}</p>}
            <Stack
              sx={{
                border: '1px solid black',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {users &&
                users.map((item: UserPayload) => (
                  <Stack key={item.id}>
                    <p>{`${item.firstName}`}</p>
                    <p>{`${item.lastName}`}</p>
                    <p>{`${item.id}`}</p>
                    <p>{`${item.note}`}</p>
                  </Stack>
                ))}
            </Stack>
            <Stack padding={MetricSize.medium_15}>
              <Button onClick={handleClickMutation} variant="contained">
                Update User Status
              </Button>
            </Stack>
          </>
        </Grid>
      </Grid>
    </Stack>
  );
}
