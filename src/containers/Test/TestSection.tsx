import { Client } from '@stomp/stompjs';
import { useStomp } from '~/hooks/useStomp';

export default function TextSection() {
  const client = new Client({
    brokerURL: 'ws://103.173.155.221:8080/our-websocket',
    onConnect: () => {
      client.subscribe('/topic/test01', (message) =>
        console.log(`Received: ${message.body}`)
      );
      client.publish({ destination: '/topic/test01', body: 'First Message' });
    },
  });

  client.activate();

  return <div>Hello World</div>;
}
