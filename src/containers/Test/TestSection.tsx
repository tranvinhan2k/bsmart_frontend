import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Button from '~/components/atoms/Button';

export default function TestSection() {
  useEffect(() => {
    const URL = 'ws://103.173.155.221:8080/websocket';

    const socket = new SockJS(URL);

    function connect() {
      const stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame: any) {
        console.log(`Connected: ${frame}`);
        // stompClient.subscribe('/topic/greetings', function (greeting: any) {
        //   console.log('greeting');
        // });
      });
    }

    connect();

    return () => {
      socket.close(); // Close the WebSocket connection
    };
  }, []);

  return <Button>Connect Websocket</Button>;
}
