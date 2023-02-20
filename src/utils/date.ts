import Moment from 'moment';

export const formatDate = (dateText: string) => {
  return Moment(dateText).format('DD/MM/YYYY');
};
