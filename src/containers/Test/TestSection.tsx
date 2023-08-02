import { Stomp } from '@stomp/stompjs';
import { Button, Stack } from '@mui/material';
import SockJS from 'sockjs-client';
import { useEffect, useState } from 'react';

const topic = '/topic/message';

const WS_URL = 'http://localhost:8082/websocket';

export default function TextSection() {
  const socket = new SockJS(WS_URL);
  const stompClient = Stomp.over(socket);

  const [message, setMessage] = useState<string>('');

  const connect = () => {
    stompClient.activate();
  };

  useEffect(() => {
    connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack
      sx={{
        minHeight: '100vh',
      }}
    >
      <div>{message}</div>
    </Stack>
  );
}
