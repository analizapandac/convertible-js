# convertible-js :clock1:
[![dependencies Status](https://david-dm.org/analizapandac/convertible-js/status.svg)](https://david-dm.org/analizapandac/convertible-js)
[![npm version](https://badge.fury.io/js/convertible-js.svg)](https://badge.fury.io/js/convertible-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Convert 12-hour time string to 24-hour time and vice versa with flexible formatting.

The library is available as an [npm package](https://www.npmjs.com/package/convertible-js). To install the package run:

```
npm install convertible-js --save
# or with yarn
yarn add convertible-js
```
## **Docs**

### **convertTime(input, options)**

Converts 12-hour time string to 24-hour time and vice versa.

#### Arguments
| Name        | Type           | Description  |
| ------------- |:-------------:| -----:|
| input     | string | time to convert or format|
| options _(optional)_      | Object      | options object for converting and formatting |

##### Options (Optional)
`convertTo`: _Optional_. The time type to convert to. Can only be either `'12-hour'` or `'24-hour'` 

`format`:  _Optional_. The desired time format.

| Unit        | Pattern           | Result examples  |
| ------------- |:-------------:| -----:|
| Hour [1-12]     | h | 1, 2, ..., 11, 12|
|    | hh | 01, 02, ..., 11, 12|
| Hour [1-23]     | H | 0, 1, 2, ..., 23|
|    | HH | 00, 01, 02, ..., 23|
| Minute    | m | 0, 1, ..., 59|
|    | mm | 00, 01, ..., 59|
| AM, PM    | a | am, pm|
|    | A | AM, PM|

#### Returns ( string | undefined )
`string` - By default, it returns the opposite format of the given time (`12-hour` to `24-hour`) unless `convertTo` is specified in the second argument object.

`undefined` - If arguments provided are invalid or if an error occured while rounding the time. The library will not throw any error.

#### Usage

```js
// CommonJS
// var convertTime = require('convertible-js');

// ES2015
import convertTime from 'convertible-js';

convertTime('12:04am'); // => '00:04'
convertTime('10:00am'); // => '10:00'
convertTime('2pm'); // => '14:00'
convertTime('1am'); // => '01:00'

convertTime('10:00:50am'); // => '10:00:50'
convertTime('10:00:54pm'); // => '22:00:54'
convertTime('10:00pm'); // => '22:00'
convertTime('12:06:34PM'); // => '12:06:34'
convertTime('12:06:34AM'); // => '00:06:34'


convertTime('00:00'); // => '12:00 AM'
convertTime('10:00'); // => '10:00 AM'
convertTime('22:00:54'); // => '10:00:54 PM'
convertTime('23:59:54'); // => '11:59:54 PM'

// Using `convertTo`
convertTime('00:00', { convertTo: '24-hour' }); // => '00:00', since it's already in 24-hour
convertTime('00:01', { convertTo: '12-hour' }); // => '12:01 AM'

// Using `format`
convertTime('10:34pm', { convertTo: '24-hour', format: 'HH:mm' }); // => '22:34'
convertTime('10:34pm', { convertTo: '12-hour', format: 'HH:mm A' }); // => '10:34 PM'

```

## License

MIT © Ana Liza Pandac