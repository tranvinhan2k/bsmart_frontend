import { Stomp } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import { selectMessage, selectProfile } from '~/redux/user/selector';
import { updateWebsocketMessage } from '~/redux/user/slice';
import toast from '~/utils/toast';
import { closeUrl } from '~/utils/window';

export interface WebSocketMessagePayload {
  status: string;
  data: {
    viTitle: string;
    viContent: string;
    data: null;
  };
}

function NotificationMessage({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div style={{ height: '100%' }}>
      {/* insert your icon here */}
      <span style={{ fontWeight: 'bold', color: '#000' }}>{title}</span>{' '}
      {content}
    </div>
  );
}

export const useSocket = () => {
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
          const messageObject: WebSocketMessagePayload = JSON.parse(
            message?.body
          );
          dispatch(updateWebsocketMessage(messageObject));
          toast.notifyInfoToast(
            <NotificationMessage
              title={messageObject.data.viTitle}
              content={messageObject.data.viContent}
            />
          );
        };
        stompClient.subscribe(topic, handleReceivedMessage); // Replace '/topic/updates' with your desired subscription destination
      });
    };
    connect();
  }, [dispatch, profile.email]);
};
