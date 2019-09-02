import { ConvertTimeOptions, Hours, Minutes, TimeFormat } from './custom-types';
import * as RegexPatterns from './regex-patterns';
import {
  customTimeFormat,
  defaultTimeFormat,
  getHoursFrom12HoursTime,
  getHoursFrom24HoursTime,
  getTimePeriodFrom24HourTime,
} from './utils';

export const convertTime = (time: string, options?: ConvertTimeOptions): string | undefined => {
  try {
    if (typeof time !== 'string') {
      return undefined;
    }

    // ex. 3pm
    const isOnlyHoursWithPeriod = RegexPatterns.ONLY_HOURS_AND_TIME_PERIOD.test(time);

    if (
      !RegexPatterns.TWELVE_HOUR_FORMAT.test(time) &&
      !RegexPatterns.TWENTY_FOUR_HOUR_FORMAT.test(time) &&
      !isOnlyHoursWithPeriod
    ) {
      return undefined;
    }

    const hoursAndMinutesRegexPattern = !isOnlyHoursWithPeriod
      ? RegexPatterns.HOURS_AND_MINUTES
      : RegexPatterns.HOURS_WITHOUT_MINUTES;
    let isTwelveHourFormat = RegexPatterns.TWELVE_HOUR_FORMAT.test(time);
    if (isOnlyHoursWithPeriod) {
      // it means it's also a 12-hour format time
      isTwelveHourFormat = true;
    }
    const hoursAndMinutesMatches = time.match(hoursAndMinutesRegexPattern);
    const hoursAndMinutes = hoursAndMinutesMatches ? hoursAndMinutesMatches[0] : null;
    if (!hoursAndMinutes) {
      return undefined;
    }

    const timeSuffix = time.replace(hoursAndMinutesRegexPattern, '');
    let period: RegExpMatchArray | null | string = time.match(RegexPatterns.AM_PM);
    if (period) {
      period = period[0];
    }

    let hours: Hours = Number(hoursAndMinutes.split(':')[0]);
    const minutes: Minutes = Number(hoursAndMinutes.split(':')[1]) || 0;
    const secondsAndMilleseconds = timeSuffix.replace(RegexPatterns.AM_PM, '');
    let convertToFormat = '';
    let desiredFormat = '';

    if (Object.prototype.toString.call(options) === '[object Object]') {
      convertToFormat = (options || {}).convertTo || '';
      desiredFormat = (options || {}).format || '';
    }

    if (isTwelveHourFormat && convertToFormat !== TimeFormat.twelveHour) {
      hours = getHoursFrom12HoursTime(hours, period);
    }

    // if user only want to format the time without converting it, retain the given period
    // ex. 10:34pm => 10:34 PM
    let timePeriod = desiredFormat ? period : '';

    if (!isTwelveHourFormat && convertToFormat !== TimeFormat.twentyFourHour) {
      // get am/pm time period first from 24 hours before converting hours to 12-hours
      timePeriod = getTimePeriodFrom24HourTime(hours);

      // convert 24-hour hours to 12-hours format
      hours = getHoursFrom24HoursTime(hours);
    }

    if (desiredFormat) {
      return customTimeFormat({ hours, minutes, period: timePeriod }, desiredFormat);
    } else {
      return defaultTimeFormat({ hours, minutes, period: timePeriod, secondsAndMilleseconds });
    }
  } catch (err) {
    console.log(`convertTime(${time}, ${JSON.stringify(options)}): ${err}`);
    return undefined;
  }
};

export default convertTime;
