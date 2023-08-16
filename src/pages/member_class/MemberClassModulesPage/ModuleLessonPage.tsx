import { ActivityLessonPayload } from '~/models/type';
import ModuleActivity from './ModuleActivity';

interface Props {
  name: string;
  item: ActivityLessonPayload;
}

export default function ModuleLessonPage({ name, item }: Props) {
  return <ModuleActivity name={name} description={item.description} />;
}
