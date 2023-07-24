import dayjs, { Dayjs } from 'dayjs';
import Moment from 'moment';

export const formatDate = (dateText: string) => {
  return Moment(dateText).format('DD/MM/YYYY');
};

export const formatISODateStringToDisplayDateTime = (inputDate: string) => {
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
export const formatISODateStringToDisplayDate = (inputDate: string) => {
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

export const formatISODateDateToDisplayDate = (inputDate: Date) => {
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

export const formatISODateDateToDisplayDateTime = (
  inputDate: Date | string
) => {
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

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function isValidDate(d: Dayjs) {
  return dayjs(d).isValid();
}

export function compareDate(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
