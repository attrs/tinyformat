var moment = require('moment');
var today = moment(moment(new Date()).format('YYYYMMDD'), 'YYYYMMDD');

module.exports = {
  currency: function(number) {
    if( !(0).toLocaleString ) return number;
    return typeof number === 'number' ? number.toLocaleString() + '원' : (number || '') + '원';
  },
  number: function(number) {
    if( !(0).toLocaleString ) return number;
    return typeof number === 'number' ? number.toLocaleString() : (number || '');
  },
  abs: function(number) {
    if( typeof number !== 'number' ) return number;
    return Math.abs(number);
  },
  date: function(input, format, defaultValue) {
    if( !input ) return defaultValue;
    var date;
    if( typeof input === 'number' ) {
      date = moment(new Date(input));
    } else if( typeof input === 'string' ) {
      if( input.length === 16 && moment(input, 'YYYYMMDDHHmmssSS').isValid() ) date = moment(input, 'YYYYMMDDHHmmssSS');
      else if( input.length === 14 && moment(input, 'YYYYMMDDHHmmss').isValid() ) date = moment(input, 'YYYYMMDDHHmmss');
      else if( input.length === 8 && moment(input, 'YYYYMMDD').isValid() ) date = moment(input, 'YYYYMMDD');
      else date = moment(input);
    } else if( input instanceof Date ) {
      date = moment(input);
    }
  
    if( !date || !date.isValid() ) return console.error('Unparseable Date:' + input) && defaultValue;
  
    return date.format(format);
  }
};
