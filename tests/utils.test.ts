import {
  customTimeFormat
} from '../src/utils';

test('customTimeFormat', () => {
  expect(customTimeFormat({ hours: 10, minutes: 10, period: 'p' }, 'HH:mm A')).toEqual('10:10 PM');
  expect(customTimeFormat({ hours: 0, minutes: 1 }, 'HH:mm A')).toEqual('00:01 A');
});