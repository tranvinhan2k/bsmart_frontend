import { Client, Stomp } from '@stomp/stompjs';
import { Button, Stack } from '@mui/material';
import SockJS from 'sockjs-client';

// const SOCKET_URL = 'http://103.173.155.221:8080/websocket';

const topic = '/topic/messages';

const WS_URL = 'http://103.173.155.221:8080/websocket';

export default function TextSection() {
  const sock = new SockJS(WS_URL);
  const stompClient = Stomp.over(sock);
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

  // const client = new Client({
  //   brokerURL: WS_URL,
  //   onConnect: () => {
  //     console.log('Connected');

  //     client.subscribe(topic, (message) =>
  //       console.log(`Received: ${message.body}`)
  //     );
  //     client.publish({ destination: topic, body: 'First Message' });
  //   },
  //   onWebSocketError: (error) => {
  //     console.error('Error with websocket', error);
  //   },
  //   onStompError: (frame) => {
  //     console.error(`Broker reported error: ${frame.headers.message}`);

  //     console.error(`Additional details: ${frame.body}`);
  //   },
  // });

  const connect = () => {
    stompClient.activate();
  };

  const disconnect = () => {
    stompClient.deactivate();
  };

  stompClient.connect({}, () => {
    console.log('hello world');
  });

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
