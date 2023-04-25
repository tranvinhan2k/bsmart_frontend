export interface MentorPayload {
  id: number;
  introduce: string;
  workingExperience: string;
  userId: number;
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
}
