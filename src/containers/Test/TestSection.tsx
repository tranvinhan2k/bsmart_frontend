import { useStomp } from '~/hooks/useStomp';

export default function TextSection() {
  const { isConnected } = useStomp({
    brokerURL: 'http://103.173.155.221:8080/our-socket',
  });

  return <div>{isConnected}</div>;
}
