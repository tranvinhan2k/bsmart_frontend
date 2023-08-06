import { Stomp } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import { selectProfile } from '~/redux/user/selector';
import { closeUrl } from '~/utils/window';

export const useSocket = () => {
  const [data, setData] = useState<{
    status: string;
    data: {
      viTitle: string;
      viContent: string;
      data: null;
    };
  }>({
    data: {
      viContent: '',
      viTitle: '',
      data: null,
    },
    status: '',
  });
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

  useEffect(() => {
    const connect = () => {
      const topic = `/queue/message${profile.email}`;
      const WS_URL = 'http://103.173.155.221:8080/websocket';
      const socket = new SockJS(WS_URL);
      const stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame: any) {
        const handleReceivedMessage = function (message: any) {
          setData(JSON.parse(message.body));
        };
        stompClient.subscribe(topic, handleReceivedMessage); // Replace '/topic/updates' with your desired subscription destination
      });
    };
    connect();
  }, [dispatch, profile.email]);

  return { data };
};
