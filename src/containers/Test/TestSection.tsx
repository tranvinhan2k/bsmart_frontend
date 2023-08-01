import { Client } from '@stomp/stompjs';
import { Button, Stack } from '@mui/material';

// const SOCKET_URL = 'http://103.173.155.221:8080/websocket';

const topic = '/user/queue/private-message';

const WS_URL = 'ws://103.173.155.221:8080/websocket';

export default function TextSection() {
  const client = new Client({
    brokerURL: WS_URL,
    onConnect: () => {
      console.log('Connected');

      client.subscribe(topic, (message) =>
        console.log(`Received: ${message.body}`)
      );
      client.publish({ destination: topic, body: 'First Message' });
    },
    onWebSocketError: (error) => {
      console.error('Error with websocket', error);
    },
    onStompError: (frame) => {
      console.error(`Broker reported error: ${frame.headers.message}`);

      console.error(`Additional details: ${frame.body}`);
    },
  });

  const connect = () => {
    client.activate();
  };

  const disconnect = () => {
    client.deactivate();
  };

  client.activate();

  // client.activate();

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
