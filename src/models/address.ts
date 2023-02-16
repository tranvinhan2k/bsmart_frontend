export interface AddressDataPayload {
  id: number;
  city: string;
  addresses: DetailAddressPayload[];
}

export interface DetailAddressPayload {
  id: number;
  address: string;
  phone: string;
}
