'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StaticRouter = require('./StaticRouter');

var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ServerRouter = function (_React$Component) {
  _inherits(ServerRouter, _React$Component);

  function ServerRouter() {
    _classCallCheck(this, ServerRouter);

    return _possibleConstructorReturn(this, (ServerRouter.__proto__ || Object.getPrototypeOf(ServerRouter)).apply(this, arguments));
  }

  _createClass(ServerRouter, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        serverRouter: this.props.context
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          context = _props.context,
          rest = _objectWithoutProperties(_props, ['context']);

      var redirect = function redirect(location) {
        context.setRedirect(location);
      };
      return _react2.default.createElement(_StaticRouter2.default, _extends({
        action: 'POP',
        location: location,
        onReplace: redirect,
        onPush: redirect
      }, rest));
    }
  }]);

  return ServerRouter;
}(_react2.default.Component);

ServerRouter.propTypes = {
  context: _react.PropTypes.object.isRequired,
  location: _react.PropTypes.string.isRequired,
  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node])
};
ServerRouter.childContextTypes = {
  serverRouter: _react.PropTypes.object.isRequired
};
exports.default = ServerRouter;