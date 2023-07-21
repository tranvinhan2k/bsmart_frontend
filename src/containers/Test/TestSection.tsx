import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useState } from 'react';
import { useStomp } from '~/hooks/useStomp';

export default function TextSection() {
  const [text, setText] = useState('');
  const sock = new SockJS('http://103.173.155.221:8080/websocket');
  sock.onopen = function () {
    console.log('open');
    setText(`${text} \n Connected`);
    sock.send('test');
  };

  sock.onmessage = function (e) {
    console.log('message', e.data);
    setText(`${text} \n Message ${e.data}`);

    sock.close();
  };

  sock.onclose = function () {
    setText(`${text} \n Close `);
  };

  return <div>{`Wed Socket \n ${text}`}</div>;
}
