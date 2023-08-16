import { useMutation } from '@tanstack/react-query';
import mentorProfileApi from '~/api/mentors';
import { Key } from './key';

export interface UseMutationUpdateMentorProfileRequestPayload {
  // avatar: string;
  //
  fullName: string;
  birthday: string;
  address: string;
  phone: string;
  gender: string;
  //
  mentorProfile: {
    id: number;
    introduce: string;
    workingExperience: string;
    status: string;
    mentorSkills: {
      skillId: number;
      name: string;
      yearOfExperiences: number;
    }[];
  };
  // degreeList: Array<any>; -> ??
  //
  email: string;
  status: boolean;
  linkedinLink: string;
  facebookLink: string;
  website: string;
  verified: boolean;
}

export const useMutationUpdateMentorProfileRequest = () => {
  const mutationResult = useMutation({
    mutationKey: [Key.UseMutationUpdateMentorProfileRequest],
    mutationFn: mentorProfileApi.updateMentorProfileRequest,
  });
  return mutationResult;
};
