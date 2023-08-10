import { Link } from '@mui/material';
import { SubActivityType } from '~/constants/activity';
import { ActivityResourcePayload } from '~/models/type';
import SubActivityHeader from '../SubActivityHeader';

interface SubActivityContentResourceProps {
  name: string;
  item: ActivityResourcePayload;
}

export default function SubActivityContentResource({
  name,
  item,
}: SubActivityContentResourceProps) {
  const handleOpenUrl = () => {
    if (item.file) window.open(item.file.url);
  };

  return (
    <>
      <SubActivityHeader type={SubActivityType.RESOURCE} />
      <Link href="#resource" underline="hover" onClick={handleOpenUrl}>
        {name}
      </Link>
    </>
  );
}
