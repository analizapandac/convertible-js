// For more information about each regex, see the links above each pattern for more details

// https://regex101.com/r/7CJJl3/1
export const AM_PM = /(a\.?m?\.?|p\.?m?\.?)$/i;
// https://regex101.com/r/CYsdOB/2/
export const HOURS_AND_MINUTES = /(^(0?[1-9]|1[012]):([0-5][0-9]|[1-9]))|(^([01]?[0-9]|2[0-3]):([0-5][0-9]|[1-9]))/;
// https://regex101.com/r/VfeB0v/1
export const HOURS_WITHOUT_MINUTES = /^(1[012]|0?[1-9])/;
// https://regex101.com/r/Nc0t3O/2
export const TWELVE_HOUR_FORMAT = /^(0?[1-9]|1[012]):([0-5][0-9]|[1-9])(:([0-5][0-9]|[1-9]))?(\.\d{1,3})?(\s*(a\.?m?\.?|p\.?m?\.?))$/i;
// https://regex101.com/r/LBoYE1/2
export const TWENTY_FOUR_HOUR_FORMAT = /^([01]?[0-9]|2[0-3]):([0-5][0-9]|[1-9])(:([0-5][0-9]|[1-9]))?(\.\d{1,3})?$/;
// https://regex101.com/r/Ld23AW/2
export const ONLY_HOURS_AND_TIME_PERIOD = /^(0?[1-9]|1[012])\s*(a\.?m?\.?|p\.?m?\.?)$/i;

// whether it's am or pm, case insensitive, also catches . in between, also just `a` or `p`
export const AM = /a\.?m?\.?$/i;
export const PM = /p\.?m?\.?$/i;
