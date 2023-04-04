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
