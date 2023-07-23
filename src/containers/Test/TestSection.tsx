import { useState } from 'react';
import { Stack } from '@mui/material';
import SockJS from 'sockjs-client';

const SOCKET_URL = 'http://103.173.155.221:8080/websocket';
const topics = '/topics/messages';

export default function TextSection() {
  const [message, setMessage] = useState('You server message here.');
  const sock = new SockJS(SOCKET_URL);
  sock.onopen = () => {
    console.log('Connected!!');
    sock.send('SUBSCRIBE /topics/messages');
  };
  sock.onmessage = (e: any) => {
    setMessage(e.data);
  };
  sock.onclose = () => {
    console.log('Closed');
  };

  return (
    <Stack
      sx={{
        minHeight: '100vh',
      }}
    >
      {message}
    </Stack>
  );
}
