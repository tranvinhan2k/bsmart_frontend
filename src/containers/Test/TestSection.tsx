import { Stomp } from '@stomp/stompjs';
import { Button, Stack } from '@mui/material';

const topic = '/topic/messages';

const WS_URL = 'ws://103.173.155.221:8080/websocket';

export default function TextSection() {
  const stompClient = Stomp.over(function () {
    return new WebSocket(WS_URL);
  });
  stompClient.onConnect = () => {
    console.log('Connected, Hello World');

    stompClient.subscribe(topic, (message) =>
      console.log(`Received: ${message.body}`)
    );
  };

  stompClient.onStompError = (frame) => {
    console.error(`Broker reported error: ${frame.headers.message}`);

    console.error(`Additional details: ${frame.body}`);
  };

  stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
  };

  const connect = () => {
    stompClient.connect({}, () => {
      console.log('hello world');
    });
  };

  const disconnect = () => {
    stompClient.deactivate();
  };

  return (
    <Stack
      sx={{
        minHeight: '100vh',
      }}
    >
      <Button onClick={connect} variant="contained">
        Connect
      </Button>
      <Button onClick={disconnect} variant="contained">
        Disconnect
      </Button>
    </Stack>
  );
}
