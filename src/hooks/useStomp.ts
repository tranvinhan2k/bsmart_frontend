import { Client, StompConfig, StompSubscription } from '@stomp/stompjs';
import { useCallback, useEffect } from 'react';

interface ObjectType {
  [key: string]: any;
}

let stompClient: Client;
let isConnected = false;
const subscriptions: { [key: string]: StompSubscription } = {};

export function useStomp(config: StompConfig, callback?: () => void) {
  const connect = useCallback(() => {
    if (!stompClient) {
      stompClient = new Client(config);
      stompClient.activate();
    }

    stompClient.onConnect = (frame) => {
      isConnected = true;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      callback && callback();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = useCallback(
    (path: string, body: ObjectType, headers: ObjectType) => {
      stompClient.publish({
        destination: path,
        headers,
        body: JSON.stringify(body),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stompClient]
  );

  const subscribe = useCallback(
    <T>(path: string, callback2: (msg: T) => void) => {
      if (!stompClient) return;

      if (subscriptions[path]) return;

      const subscription = stompClient.subscribe(path, (message) => {
        const body: T = JSON.parse(message.body);
        callback2(body);
      });
      subscriptions[path] = subscription;
    },
    []
  );

  const unsubscribe = useCallback((path: string) => {
    subscriptions[path].unsubscribe();
    delete subscriptions[path];
  }, []);

  const disconnect = useCallback(() => {
    stompClient.deactivate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stompClient]);

  useEffect(() => {
    connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    disconnect,
    subscribe,
    unsubscribe,
    subscriptions,
    send,
    isConnected,
  };
}
