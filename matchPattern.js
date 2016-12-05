'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = {};

var getMatcher = function getMatcher(pattern) {
  var matcher = cache[pattern];

  if (!matcher) {
    var keys = [];
    var regex = (0, _pathToRegexp2.default)(pattern, keys);
    matcher = cache[pattern] = { keys: keys, regex: regex };
  }

  return matcher;
};

var truncatePathnameToPattern = function truncatePathnameToPattern(pathname, pattern) {
  return pathname.split('/').slice(0, pattern.split('/').length).join('/');
};

var parseParams = function parseParams(pattern, match, keys) {
  return match.slice(1).reduce(function (params, value, index) {
    params[keys[index].name] = value;
    return params;
  }, {});
};

var matchPattern = function matchPattern(pattern, location, matchExactly, parent) {
  var specialCase = !matchExactly && pattern === '/';

  if (specialCase) {
    return {
      params: null,
      isExact: location.pathname === '/',
      pathname: '/'
    };
  } else {
    if (!matchExactly && parent && pattern.charAt(0) !== '/') {
      pattern = parent.pathname + (parent.pathname.charAt(parent.pathname.length - 1) !== '/' ? '/' : '') + pattern;
    }

    var matcher = getMatcher(pattern);
    var pathname = matchExactly ? location.pathname : truncatePathnameToPattern(location.pathname, pattern);
    var match = matcher.regex.exec(pathname);

    if (match) {
      var params = parseParams(pattern, match, matcher.keys);
      var locationLength = location.pathname.split('/').length;
      var patternLength = pattern.split('/').length;
      var isExact = locationLength === patternLength;
      return { params: params, isExact: isExact, pathname: pathname };
    } else {
      return null;
    }
  }
};

exports.default = matchPattern;