import dayjs, { Dayjs } from 'dayjs';
import Moment from 'moment';
import { element } from 'prop-types';

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

    result = `${hours}:${minutes} - ${day} tháng ${month}, ${year}`;
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
    result = `${day} tháng ${month}, ${year}`;
  }
  return result;
};
export const formatISODateStringToDisplayTime = (inputDate: string) => {
  let result = '';
  if (inputDate) {
    const date = new Date(inputDate);

    let hours: string | number = date.getHours();
    let minutes: string | number = date.getMinutes();
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;

    result = `${hours}: ${minutes}`;
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

    result = `${hours}:${minutes} - ${day} tháng ${month}, ${year}`;
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
    result = `${day} tháng ${month}, ${year}`;
  }
  return result;
};
export const formatISODateDateToDisplayMonthYear = (inputDate: Date) => {
  let result = '';
  if (inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();

    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;
    result = `${month}, ${year}`;
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

interface TimeSlot {
  id: number;
  name: string;
  code: string;
  startTime: string;
  endTime: string;
}

interface DayOfWeek {
  id: number;
  name: string;
  code: string;
}

interface TimeInWeekRequest {
  dayOfWeekId: number;
  slotId: number;
}

interface Payload {
  numberOfSlot: number;
  startDate: string;
  timeInWeekRequests: TimeInWeekRequest[];
}

function daysUntilNextDayOfWeek(
  startDateISO: string,
  targetDayId: number,
  count?: number
): number {
  const startDate = new Date(startDateISO);
  const currentDayId = startDate.getDay() + 1;

  if (currentDayId > targetDayId) {
    return 7 - (currentDayId - targetDayId);
  }
  if (currentDayId === targetDayId) {
    if (count === 0) {
      return 7;
    }
    return 0;
  }
  return targetDayId - currentDayId;
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function checkNearestDate(
  startDate: string,
  timeInWeekRequests: TimeInWeekRequest[]
) {
  let minDay = 99;
  let resultIndex = 0;
  for (let index = 0; index < timeInWeekRequests.length; index += 1) {
    const paramElement = timeInWeekRequests[index];
    const paramDay = daysUntilNextDayOfWeek(
      startDate,
      paramElement.dayOfWeekId
    );
    if (minDay > paramDay) {
      minDay = paramDay;
      resultIndex = index;
    }
  }
  return resultIndex;
}

export function generateEndDate({
  numberOfSlot,
  startDate,
  timeInWeekRequests,
}: Payload): Date {
  let count = 0;
  let endDate = new Date(startDate);

  const startDateTimeSlotIndex = timeInWeekRequests.findIndex(
    (item) => item.dayOfWeekId === endDate.getDay() + 1
  );

  if (startDateTimeSlotIndex !== -1) {
    count = startDateTimeSlotIndex;
  }

  count = checkNearestDate(startDate, timeInWeekRequests);

  for (let index = 0; index < numberOfSlot; index += 1) {
    let nextCount = 0;
    if (count !== timeInWeekRequests.length - 1) {
      nextCount = count + 1;
    }

    const paramElement = timeInWeekRequests[count];

    let dayToNextSlot = daysUntilNextDayOfWeek(
      endDate.toISOString(),
      paramElement.dayOfWeekId,
      count
    );

    if (index === 0 && paramElement.dayOfWeekId === endDate.getDay() + 1) {
      dayToNextSlot = 0;
    }

    endDate = addDays(endDate, dayToNextSlot);

    count = nextCount;
  }

  return endDate;
}
