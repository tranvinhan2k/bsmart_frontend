import { RolePayload } from './type';

export interface UserPayload {
  id: string;
  lastName: string;
  firstName: string;
  note: string;
}

export interface GetAllUserPayload {
  q?: string;
  role?: string;
  isVerified?: boolean | '';
  page?: number;
  size?: number;
  sort?: string[];
}
export interface GetAllUserReturnPayload {
  id: number;
  fullName: string;
  email: string;
  birthday: string;
  address: string;
  phone: string;
  status: string;
  gender: string;
  roles: RolePayload[];
  linkedinLink: string | null;
  facebookLink: string | null;
  website: string | null;
  userImages: any[];
  wallet: Wallet;
  mentorProfile: any;
  isVerified: boolean;
}

interface Wallet {
  id: number;
  balance: number;
  previous_balance: number;
  owner_id: number;
}
