import { useEffect } from 'react';
import { connectWebsocket } from '~/utils/websocket';

export const useSocket = () => {
  const connect = () => {
    connectWebsocket();
  };

  useEffect(() => {
    connect();
  }, []);
};
