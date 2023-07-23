import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { useState } from 'react';

export default function TextSection() {
  const [text, setText] = useState('');
  let stompClient: any = null;

  const socket = new SockJS('http://103.173.155.221:8080/websocket');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame: any) {
    console.log(`Connected: ${frame}`);
    stompClient.subscribe('/topic/greeting', function (messageOutput: any) {
      console.log(messageOutput.body);
      setText(JSON.parse(messageOutput.body));
    });
  });

  // const stompClient = Stomp.over(sock);

  // stompClient.connect({}, () => {
  //   stompClient.subscribe('/topic/messages', (message) => {
  //     console.log('Hello', message.body);
  //     setText(message.body);
  //   });
  // });

  // sock.onopen = function () {
  //   console.log('open');
  //   setText(`${text} \n Connected`);
  //   sock.send('test');
  // };

  // sock.onmessage = function (e) {
  //   console.log('message', e.data);
  //   setText(`${text} \n Message ${e.data}`);

  //   sock.close();
  // };

  // sock.onclose = function () {
  //   setText(`${text} \n Close `);
  // };

  return <div>{`Wed Socket \n ${text}`}</div>;
}
