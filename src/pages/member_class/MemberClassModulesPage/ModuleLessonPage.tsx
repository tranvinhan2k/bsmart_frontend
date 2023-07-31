import { Stack, Typography } from '@mui/material';
import { FontFamily, FontSize } from '~/assets/variables';
import { ActivityLessonPayload } from '~/models/type';
import globalStyles from '~/styles';
import ModuleActivity from './ModuleActivity';

interface Props {
  name: string;
  item: ActivityLessonPayload;
}

export default function ModuleLessonPage({ name, item }: Props) {
  return <ModuleActivity name={name} description={item.description} />;
}
