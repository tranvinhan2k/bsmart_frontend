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
