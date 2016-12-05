'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BrowserHistory = require('react-history/BrowserHistory');

var _BrowserHistory2 = _interopRequireDefault(_BrowserHistory);

var _StaticRouter = require('./StaticRouter');

var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * A router that uses the HTML5 history API.
 */
var BrowserRouter = function BrowserRouter(_ref) {
  var basename = _ref.basename,
      keyLength = _ref.keyLength,
      rest = _objectWithoutProperties(_ref, ['basename', 'keyLength']);

  return _react2.default.createElement(
    _BrowserHistory2.default,
    { basename: basename, keyLength: keyLength },
    function (_ref2) {
      var history = _ref2.history,
          action = _ref2.action,
          location = _ref2.location;
      return _react2.default.createElement(_StaticRouter2.default, _extends({
        action: action,
        location: location,
        onPush: history.push,
        onReplace: history.replace,
        blockTransitions: history.block
      }, rest));
    }
  );
};

BrowserRouter.propTypes = {
  basename: _react.PropTypes.string,
  keyLength: _react.PropTypes.number,
  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node])
};

exports.default = BrowserRouter;