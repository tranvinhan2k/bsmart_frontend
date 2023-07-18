import { useParams } from 'react-router-dom';
import { formatStringToNumber } from '~/utils/number';

export const useGetIdFromUrl = (param: string) => {
  const params = useParams();
  const formatId = formatStringToNumber(params[param]);
  return formatId;
};
