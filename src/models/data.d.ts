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

export interface SidebarNavigationProps {
  title: string;
  items: {
    label: string;
    icon: IconName;
    link: string;
    items?: {
      label: string;
      icon: IconName;
      link: string;
    }[];
  }[];
}
