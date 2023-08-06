import { Stomp } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import { selectProfile } from '~/redux/user/selector';

const stompConnect = () => {};

export const connectWebsocket = () => {
  stompConnect();
};
