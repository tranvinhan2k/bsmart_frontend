import { ImageType } from './common';
import { RolePayload } from './type';
import { GenderKeys } from './variables';

export interface UserPayload {
  id: string;
  lastName: string;
  firstName: string;
  note: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  birthday: string;
  address: string;
  phone: string;
  status: string;
  gender: GenderKeys;
  roles: RolePayload[];
  linkedinLink: string | null;
  facebookLink: string | null;
  website: string | null;
  userImages: ImageType[];
  wallet: Wallet;
  mentorProfile: MentorProfile;
  isVerified: boolean;
}

interface Wallet {
  id: number;
  balance: number;
  previous_balance: number;
  owner_id: number;
}
interface MentorProfile {
  id: number;
  introduce: string;
  workingExperience: string;
  status: string;
  mentorSkills: any[];
}
