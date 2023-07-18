import { FontFamily } from '~/assets/variables';
import { ActivityKeys } from '~/models/variables';

export default function ModuleHeader({
  type,
  index,
}: {
  type: ActivityKeys;
  index: number;
}) {
  let texts = '';
  switch (type) {
    case 'RESOURCE':
      texts = 'Tài nguyên';
      break;

    default:
      texts = 'Bài học';
      break;
  }
  return (
    <span style={{ fontFamily: FontFamily.bold }}>
      {`${texts} ${index + 1}: `}
    </span>
  );
}
