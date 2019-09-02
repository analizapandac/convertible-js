import convertTime from '../src/index';

test('convertTime: with invalid first arguments', () => {
  // @ts-ignore
  expect(convertTime()).toEqual(undefined);
  // @ts-ignore
  expect(convertTime(3)).toEqual(undefined);
  // @ts-ignore
  expect(convertTime(false)).toEqual(undefined);
  // @ts-ignore
  expect(convertTime([])).toEqual(undefined);
  // @ts-ignore
  expect(convertTime({})).toEqual(undefined);

  // invalid time
  expect(convertTime('00:10am')).toEqual(undefined);
  expect(convertTime('13am')).toEqual(undefined);
  expect(convertTime('25:34')).toEqual(undefined);
  expect(convertTime('34343434')).toEqual(undefined);
  expect(convertTime('24:00')).toEqual(undefined);
});

test('convertTime: 12-hour to 24-hour format', () => {
  expect(convertTime('12:04am')).toEqual('00:04');
  expect(convertTime('10:00a')).toEqual('10:00');
  expect(convertTime('10a')).toEqual('10:00');
  expect(convertTime('12p')).toEqual('12:00');
  expect(convertTime('2pm')).toEqual('14:00');
  expect(convertTime('1am')).toEqual('01:00');

  expect(convertTime('10:00:50am')).toEqual('10:00:50');
  expect(convertTime('10:00:54pm')).toEqual('22:00:54');
  expect(convertTime('10:00pm')).toEqual('22:00');
  expect(convertTime('12:06:34PM')).toEqual('12:06:34');
  expect(convertTime('12:06:34AM')).toEqual('00:06:34');
});

test('convertTime: 24-hour to 12-hour format', () => {
  expect(convertTime('00:00')).toEqual('12:00 AM');
  expect(convertTime('10:00')).toEqual('10:00 AM');
  expect(convertTime('10:00:50')).toEqual('10:00:50 AM');
  expect(convertTime('22:00:54')).toEqual('10:00:54 PM');
  expect(convertTime('23:59:54')).toEqual('11:59:54 PM');
});

test('convertTime: with invalid second arguments', () => {
  // @ts-ignore
  expect(convertTime('00:00', [])).toEqual('12:00 AM');
});

test('convertTime: with options: convertTo', () => {
  expect(convertTime('00:00', { convertTo: '24-hour' })).toEqual('00:00');
  expect(convertTime('00:01', { convertTo: '12-hour' })).toEqual('12:01 AM');
  expect(convertTime('12:01', { convertTo: '12-hour' })).toEqual('12:01 PM');
  expect(convertTime('12:01', { convertTo: '24-hour' })).toEqual('12:01');
});

test('convertTime: with options: format', () => {
  expect(convertTime('00:01', { convertTo: '12-hour', format: 'h:m a' })).toEqual('12:1 am');
  expect(convertTime('00:01', { convertTo: '24-hour', format: 'h:m a' })).toEqual('0:1 a');
  expect(convertTime('00:01', { convertTo: '12-hour', format: 'h:m a' })).toEqual('12:1 am');
  expect(convertTime('10:34pm', { convertTo: '24-hour', format: 'HH:mm' })).toEqual('22:34');
  expect(convertTime('10:34pm', { convertTo: '12-hour', format: 'HH:mm A' })).toEqual('10:34 PM');
  expect(convertTime('10:34p', { format: 'HH:mm' })).toEqual('22:34');
  expect(convertTime('10:34p', { format: 'HH:mm A' })).toEqual('22:34 PM'); 
  expect(convertTime('10:34p', { convertTo: '12-hour', format: 'HH:mm a' })).toEqual('10:34 pm');
  expect(convertTime('10:34p', { convertTo: '12-hour', format: 'HH:mma' })).toEqual('10:34pm');
  expect(convertTime('12:10a', { convertTo: '12-hour', format: 'HH:mmaa' })).toEqual('12:10amam');
});

test('convertTime: repetittive formatting that should still work', () => {
  // invalid use case but it returns the correct formatted value
  expect(convertTime('10:34p', { format: 'HH:mm Amm' })).toEqual('22:34 PM34'); 
  expect(convertTime('12:10a', { convertTo: '12-hour', format: 'HH:mmaa' })).toEqual('12:10amam');
});
