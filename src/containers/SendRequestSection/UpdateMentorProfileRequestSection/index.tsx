import { useEffect } from 'react';
import { MentorProfileStatusType } from '~/constants/profile';
import { RequestSectionType } from '../requestSection';
import { useGetProfile } from '~/hooks/user/useGetProfile';
import UpdateMentorDegreeRequest from './UpdateMentorDegreeRequest';
import UpdateMentorProfileRequestSubmit from './UpdateMentorProfileRequestSubmit';
import UpdateMentorSkillRequest from './UpdateMentorSkillRequest';

export default function UpdateMentorProfileRequestSection({
  handleSetError,
}: RequestSectionType) {
  const { profile } = useGetProfile();

  useEffect(() => {
    if (
      profile &&
      profile.mentorProfile.status !== MentorProfileStatusType.STARTING
    ) {
      handleSetError('Trạng thái hồ sơ giáo viên không cho phép');
    }
  }, [handleSetError, profile]);

  return profile &&
    profile.mentorProfile.status === MentorProfileStatusType.STARTING ? (
    <>
      <UpdateMentorSkillRequest />
      <UpdateMentorDegreeRequest />
      <UpdateMentorProfileRequestSubmit />
    </>
  ) : null;
}
