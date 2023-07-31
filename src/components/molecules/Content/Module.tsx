import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Color, MetricSize } from '~/assets/variables';
import { IconName } from '~/components/atoms/Icon';
import TextPropLine from '~/components/atoms/texts/TextPropLine';
import { ActivityData } from '~/constants';
import {
  MentorClassActionLink,
  MentorCourseActionLink,
  MentorDashboardNavigationActionLink,
  NavigationLink,
} from '~/constants/routeLink';
import { useGetIdFromUrl } from '~/hooks';
import { ActivityKeys } from '~/models/variables';
import { selectProfile } from '~/redux/user/selector';

interface Props {
  readOnly: boolean;
  id: number;
  sectionId: number;
  name: string;
  status: ActivityKeys;
  index: number;
}

export default function Module({
  id,
  name,
  status,
  sectionId,
  index,
  readOnly,
}: Props) {
  const profile = useSelector(selectProfile);
  const role = profile.roles?.[0]?.code;
  const classId = useGetIdFromUrl('id');

  const navigate = useNavigate();
  const moduleItem = ActivityData.find((item) => item.type === status);

  const handleNavigateModulePage = () => {
    if (!readOnly) {
      if (role === 'TEACHER')
        navigate(
          `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_course_detail}/${classId}/${MentorCourseActionLink.content}/${sectionId}/${id}`
        );
      if (role === 'STUDENT')
        navigate(
          `/${NavigationLink.dashboard}/${MentorDashboardNavigationActionLink.mentor_class_detail}/${classId}/${MentorClassActionLink.activity}/${id}`
        );
    }
  };

  return (
    <Stack
      onClick={handleNavigateModulePage}
      sx={{
        transition: 'all 100ms ease',
        background: Color.white,

        marginTop: 1,
        padding: 1,

        borderRadius: MetricSize.small_5,

        ':hover': {
          cursor: !readOnly ? 'pointer' : 'auto',
          background: !readOnly ? '#ddd' : Color.white,
        },

        ':active': {
          background: !readOnly ? Color.grey : Color.white,
        },
      }}
    >
      <TextPropLine
        icon={moduleItem?.icon || 'lesson'}
        label={`${moduleItem?.label} ${index + 1}` || ''}
        value={name}
      />
    </Stack>
  );
}
