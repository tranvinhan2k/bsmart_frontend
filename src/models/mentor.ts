export interface MentorPayload {
  id: number;
  introduce: string;
  workingExperience: string;
  userId: number;
  avatar?: string;
  name?: string;
  mentorSkills: [
    {
      skillId: number;
      yearOfExperiences: number;
    }
  ];
}

export interface MentorQuickPayload {
  id: number;
  fullName: string;
  introduce: string;
  workingExperience: string;
  userImagesAvatar: string;
  averageRate: number;
  submissionCount: number;
}
