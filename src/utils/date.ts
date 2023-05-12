import Moment from 'moment';

export const formatDate = (dateText: string) => {
  return Moment(dateText).format('DD/MM/YYYY');
};

export const transformISODateToDisplayDate = (inputDate: Date) => {
  let result = '';
  if (inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();

    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;
    result = `${day} thg ${month}, ${year}`;
  }
  return result;
};

export const transformISODateToDisplayDateTime = (inputDate: Date) => {
  let result = '';
  if (inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();
    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;

    let hours: string | number = date.getHours();
    let minutes: string | number = date.getMinutes();
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;

    result = `${hours}:${minutes} - ${day} thg ${month}, ${year}`;
  }
  return result;
};
