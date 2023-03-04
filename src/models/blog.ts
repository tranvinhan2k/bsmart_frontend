import { IconName } from '~/components/atoms/Icon';

export interface BlogPayload {
  id: number;
  img: string;
  tagAuthorName: string;
  tagDate: string;
  tagSummary: string;
  title: string;
  contentShort: string;
  content: string;
}

export interface BlogTagProps {
  id: number;
  icon: IconName;
  tittle: string;
}
export interface BlogSearchIndicator {
  id: number;
  name: string;
}
