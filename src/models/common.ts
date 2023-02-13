export interface SocialPayload {
  name: string;
  link: string;
  image: string;
}

export interface ContractPayload {
  name: string;
  value: string;
  image: string;
}

export interface ActionPayload {
  isHide?: boolean;
  name: string;
  link: string;
}
