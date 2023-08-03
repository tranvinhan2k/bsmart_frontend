import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const stompConnect = () => {
  const topic = '/user/queue/private-message';
  const WS_URL = 'http://103.173.155.221:8080/websocket';
  const socket = new SockJS(WS_URL);
  const stompClient = Stomp.over(socket);
  stompClient.onConnect = (frame: any) => {
    console.log('STOMP: Connection successful');
    stompClient.subscribe(topic, function (message) {
      console.log(JSON.parse(message.body));
    });
  };

  console.log('STOMP: Attempting connection');
  stompClient.activate();
};

export const connectWebsocket = () => {
  stompConnect();
};
