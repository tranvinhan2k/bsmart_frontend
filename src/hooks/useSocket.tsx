import { Stomp } from '@stomp/stompjs';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import { selectProfile } from '~/redux/user/selector';
import toast from '~/utils/toast';
// eslint-disable-next-line import/no-cycle
import { useDispatchNotifications } from './notifications/useDispatchNotifications';

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
  const { handleDispatch, handleAddMessage } = useDispatchNotifications();
  const profile = useSelector(selectProfile);

  useEffect(() => {
    const connect = () => {
      const topic = `/queue/message${profile.email}`;
      const WS_URL = 'http://103.173.155.221:443/websocket';
      const socket = new SockJS(WS_URL);
      const stompClient = Stomp.over(socket);
      stompClient.debug = () => {};
      stompClient.connect({}, function (frame: any) {
        const handleReceivedMessage = async function (message: any) {
          const messageObject: WebSocketMessagePayload = JSON.parse(
            message?.body
          );
          await handleDispatch();
          const isPaymentMessage = true;
          if (isPaymentMessage) {
            handleAddMessage(messageObject);
          }
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
    if (profile.email) {
      connect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.email]);
};
