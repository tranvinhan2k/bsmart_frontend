export interface BankDataPayload {
  id: number;
  code: string;
  name: string;
  shortName: string;
  logo: string;
  bin: string;
  transferSupported: number;
  lookupSupported: number;
}
