import { useParams } from 'react-router-dom';
import { useQueryGetMentorByMentorId } from '~/hooks';
import MentorProfileLayout from '~/layouts/MentorProfileLayout';
import MentorIntroduceProfilePage from '../MentorIntroduceProfilePage';

export default function IntroduceMentor() {
  const { id } = useParams();
  const { mentor }: any = useQueryGetMentorByMentorId(id, true);

  return (
    <MentorProfileLayout isIntroduce mentor={mentor?.user}>
      {mentor && <MentorIntroduceProfilePage mentor={mentor} />}
    </MentorProfileLayout>
  );
}
