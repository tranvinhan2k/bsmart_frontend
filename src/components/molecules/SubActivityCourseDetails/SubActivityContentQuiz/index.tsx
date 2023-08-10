import { Link } from '@mui/material';
import { SubActivityType } from '~/constants/activity';
import { ActivityQuizPayload } from '~/models/type';
import SubActivityHeader from '../SubActivityHeader';

interface SubActivityContentQuizProps {
  name: string;
  item: ActivityQuizPayload;
}

export default function SubActivityContentQuiz({
  name,
  item,
}: SubActivityContentQuizProps) {
  return (
    <>
      <SubActivityHeader type={SubActivityType.QUIZ} />
      <Link href="#quiz" underline="hover">
        {name}
      </Link>
    </>
  );
}
