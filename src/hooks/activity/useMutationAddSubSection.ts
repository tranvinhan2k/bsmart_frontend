import activityApi from '~/api/activity';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useMutationAddSubSection = () => {
  const mutationLesson = useCustomMutation(
    ['add_lesson'],
    activityApi.addLessonActivity
  );
  const mutationAnnouncement = useCustomMutation(
    ['add_lesson'],
    activityApi.addAnnouncementActivity
  );
  const mutationAssignment = useCustomMutation(
    ['add_lesson'],
    activityApi.addAssignmentActivity
  );
  const mutationQuiz = useCustomMutation(
    ['add_lesson'],
    activityApi.addQuizActivity
  );
  const mutationResource = useCustomMutation(
    ['add_lesson'],
    activityApi.addResourceActivity
  );

  return {
    mutationAnnouncement,
    mutationAssignment,
    mutationLesson,
    mutationQuiz,
    mutationResource,
  };
};
