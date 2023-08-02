import { Stomp } from '@stomp/stompjs';
import { Button, Stack } from '@mui/material';
import SockJS from 'sockjs-client'
import { useEffect, useState } from 'react';

const topic = '/topic/messages';

const WS_URL = 'http://localhost:8082/websocket';

export default function TextSection() {
  const socket = new SockJS(WS_URL);
  const stompClient = Stomp.over(socket);

  const [message, setMessage] = useState<string>("");

  const connect = () => {
    stompClient.connect({}, function () {
        stompClient.subscribe('/topic/messages', function (message: any) {
          const body: any = JSON.stringify(message?.body)
          console.log("body", body);
          setMessage(body?.content);
      });
    });
  }

  useEffect(() => {
    connect();
  }, [])

  return (
    <Stack
      sx={{
        minHeight: '100vh',
      }}
    >
      <div>
        {message}
      </div>
    </Stack>
  );
}
