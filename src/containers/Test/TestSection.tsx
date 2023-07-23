import { useState } from 'react';
import { Stack } from '@mui/material';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const SOCKET_URL = 'http://103.173.155.221:8080/websocket';
const topic = '/topics/messages';

export default function TextSection() {
  const [message, setMessage] = useState('You server message here.');
  const sock = new SockJS(SOCKET_URL);
  const stompClient = Stomp.over(sock);

  const onMessageReceived = (payload: any) => {
    console.log(`onMessageReceived ${payload}`);
  };

  const onConnected = () => {
    console.log('onConnected');
    // Subscribe to the Public Topic
    stompClient.subscribe(topic, onMessageReceived);
  };

  const onError = (error: any) => {
    console.log(error);
  };

  stompClient.connect({}, onConnected, onError);

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
