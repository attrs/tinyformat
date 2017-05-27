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
    
    var date = (+input && moment(new Date(input))) || moment(input);
    if( !date || !date.isValid() ) return console.error('Unparseable Date:' + input) && defaultValue;
    return date.format(format);
  }
};