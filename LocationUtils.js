'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRouterPath = exports.createRouterLocation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _PathUtils = require('history/PathUtils');

var createRouterLocation = function createRouterLocation(input, parseQuery, stringifyQuery) {
  if (typeof input === 'string') {
    var location = (0, _PathUtils.parsePath)(input);
    location.query = location.search !== '' ? parseQuery(location.search) : null;
    return location;
  } else {
    // got a location descriptor
    return {
      pathname: input.pathname || '',
      search: input.search || (input.query ? '?' + stringifyQuery(input.query) : ''),
      hash: input.hash || '',
      state: input.state || null,
      query: input.query || (input.search ? parseQuery(input.search) : null)
    };
  }
};

var createRouterPath = function createRouterPath(input, stringifyQuery) {
  return typeof input === 'string' ? input : (0, _PathUtils.createPath)(_extends({}, input, {
    search: input.search || (input.query ? '?' + stringifyQuery(input.query) : '')
  }));
};

exports.createRouterLocation = createRouterLocation;
exports.createRouterPath = createRouterPath;