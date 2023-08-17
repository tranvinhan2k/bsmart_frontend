import { WithdrawRequestStatusType } from '~/constants/transaction';

export interface YearRevenue {
  month: number;
  totalIncome: number;
  revenue: number;
  promotion: number;
  mentorShare: number;
}
export interface ManagedWithdrawRequest {
  id: number;
  name: string;
  bankName: string;
  bankAccount: string;
  bankNumber: string;
  amount: number;
  status: WithdrawRequestStatusType;
  createdAt: string;
  note: string | null;
}
