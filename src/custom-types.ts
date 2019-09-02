export type Hours = string | number;
export type Minutes = string | number;

type TwelveHourTime = '12-hour';
type TwentyFourHourTime = '24-hour';

export enum TimeFormat {
  twelveHour = '12-hour',
  twentyFourHour = '24-hour',
}

// TODO: Pipeline, also allow separator of AM/PM
export interface ConvertTimeOptions {
  convertTo?: TwelveHourTime | TwentyFourHourTime;
  format?: string;
}
