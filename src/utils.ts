import { AM, PM } from './constants';
import { Hours, Minutes } from './custom-types';

import * as RegexPatterns from './regex-patterns';

interface TimeComponents {
  hours: Hours;
  minutes: Minutes;
  period?: string | null;
  secondsAndMilleseconds?: string;
}

const addLeadingZero = (time: Hours | Minutes): string => {
  // adding leading zero to hours and minutes if it's not two-digit
  if (time && Number(time) < 10) {
    return `0${time}`;
  }
  // if time is a falsy value ("" or 0)
  if (!time) {
    return '00';
  }
  return `${time}`;
};


export const customTimeFormat = ({ hours, minutes, period }: TimeComponents, desiredFormat: string): string => {
  // => /hh/gi means all occurence of hh (/g) regardless of the casing (/i)
  let time = desiredFormat
    .replace(/hh/gi, addLeadingZero(hours))
    .replace(/h/gi, hours.toString())
    .replace(/mm/gi, addLeadingZero(minutes))
    .replace(/m/gi, minutes.toString());

  // replace time period only if it exists
  if (period) {
    period = RegexPatterns.AM.test(period) ? AM : PM;
    const upperCasePeriod = period ? period.toUpperCase() : '';
    const lowerCasePeriod = period ? period.toLowerCase() : '';
    time = time.replace(/A/g, upperCasePeriod).replace(/a/g, lowerCasePeriod);
  }
  return time;
};

export const defaultTimeFormat = ({ hours, minutes, period, secondsAndMilleseconds }: TimeComponents): string => {
  let time = `${addLeadingZero(hours)}:${addLeadingZero(minutes)}${secondsAndMilleseconds}`;
  if (period) {
    // add space before it so that 12-hour time is formatted like this hh:mm A
    time = `${time} ${period}`;
  }
  return time;
};

export const getHoursFrom12HoursTime = (hours: Hours, period: string | null): Hours => {
  if (!period) {
    return hours;
  }
  hours = Number(hours);

  // if period is PM and hours is < 12, add 12 hours
  if (RegexPatterns.PM.test(period) && hours < 12) {
    hours = hours + 12;
  }

  // if time period is AM and hours is === 12, deduct 12 since 12AM is 00 in 24 hour
  if (RegexPatterns.AM.test(period) && hours === 12) {
    hours = hours - 12;
  }

  return hours;
};

export const getHoursFrom24HoursTime = (hours: Hours): Hours => {
  hours = Number(hours);

  // hours is > 13
  if (hours >= 13) {
    hours = hours - 12;
  }

  if (hours === 0) {
    hours = hours + 12;
  }

  return hours;
};

// time period is AM/PM
export const getTimePeriodFrom24HourTime = (hours: Hours): string => {
  hours = Number(hours);

  // if period is PM and hours is < 12, add 12 hours
  if (hours < 12) {
    return AM;
  }

  // if time period is AM and hours is === 12, deduct 12 since 12AM is 00 in 24 hour
  return PM;
};
