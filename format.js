var moment = require('moment');
var currencyFormatter = require('currency-formatter');
var locale = require('browser-locale')();
locale = (locale && locale.split('-')[0]) || locale;

moment.locale(locale);

module.exports = {
  locale: function(locale) {
    if( !locale || typeof locale != 'string' ) return this;
    moment.locale(locale);
    return this;
  },
  currency: function(value, currency, def) {
    if( typeof value !== 'number' || isNaN(value) ) return def || '';
    var opt;
    if( typeof currency === 'string' ) opt = { code: currency };
    else if( typeof currency === 'number' ) opt = { precision: currency, format: '%v' };
    else if( currency && typeof currency === 'object' ) opt = currency;
    else opt = { precision: 0, format: '%v' };
    return currencyFormatter.format(value, opt); 
  },
  symbol: function(currency) {
    if( !currency ) return '';
    var currency = currencyFormatter.findCurrency(currency.toUpperCase());
    return currency && currency.symbol;
  },
  abs: function(number) {
    return (+number && Math.abs(number)) || number;
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