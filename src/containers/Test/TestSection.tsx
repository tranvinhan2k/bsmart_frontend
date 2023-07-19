import { Client } from '@stomp/stompjs';
import { useStomp } from '~/hooks/useStomp';

export default function TextSection() {
  const { isConnected } = useStomp(
    {
      brokerURL: 'ws://103.173.155.221:8080/our-websocket',
    },
    () => {
      console.log('Hello World');
    }
  );

  return <div>{`hello World ${isConnected}`}</div>;
}
