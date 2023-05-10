export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface LoginResponsePayload {
  email: string;
  id: number;
  roles: RoleKeys[];
  token: string;
}
