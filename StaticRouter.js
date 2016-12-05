'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _queryString = require('query-string');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MatchProvider = require('./MatchProvider');

var _MatchProvider2 = _interopRequireDefault(_MatchProvider);

var _LocationUtils = require('./LocationUtils');

var _PropTypes = require('./PropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultStringifyQuery = function defaultStringifyQuery(query) {
  return (0, _queryString.stringify)(query).replace(/%20/g, '+');
};

var StaticRouter = function (_React$Component) {
  _inherits(StaticRouter, _React$Component);

  function StaticRouter() {
    _classCallCheck(this, StaticRouter);

    return _possibleConstructorReturn(this, (StaticRouter.__proto__ || Object.getPrototypeOf(StaticRouter)).apply(this, arguments));
  }

  _createClass(StaticRouter, [{
    key: 'createLocationForContext',
    value: function createLocationForContext(loc) {
      var _props = this.props,
          parseQuery = _props.parseQuery,
          stringifyQuery = _props.stringifyQuery;

      return (0, _LocationUtils.createRouterLocation)(loc, parseQuery, stringifyQuery);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      var createHref = function createHref(to) {
        var path = (0, _LocationUtils.createRouterPath)(to, _this2.props.stringifyQuery);
        return _this2.props.createHref(path);
      };

      var location = this.getLocation();

      return {
        location: location,
        router: {
          createHref: createHref,
          transitionTo: function transitionTo(loc) {
            _this2.props.onPush(_this2.createLocationForContext(loc));
          },
          replaceWith: function replaceWith(loc) {
            _this2.props.onReplace(_this2.createLocationForContext(loc));
          },
          blockTransitions: function blockTransitions(getPromptMessage) {
            _this2.props.blockTransitions(getPromptMessage);
          }
        }
      };
    }
  }, {
    key: 'getLocation',
    value: function getLocation() {
      // TODO: maybe memoize this on willReceiveProps to get extreme w/ perf
      var _props2 = this.props,
          location = _props2.location,
          parseQuery = _props2.parseQuery,
          stringifyQuery = _props2.stringifyQuery;

      return (0, _LocationUtils.createRouterLocation)(location, parseQuery, stringifyQuery);
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      var location = this.getLocation();

      return _react2.default.createElement(
        _MatchProvider2.default,
        null,
        typeof children === 'function' ? children({ location: location, router: this.getChildContext().router }) : children
      );
    }
  }]);

  return StaticRouter;
}(_react2.default.Component);

StaticRouter.propTypes = {
  action: _PropTypes.action.isRequired,
  blockTransitions: _react.PropTypes.func,
  children: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func]),
  createHref: _react.PropTypes.func.isRequired,
  location: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]).isRequired,
  onPush: _react.PropTypes.func.isRequired,
  onReplace: _react.PropTypes.func.isRequired,
  stringifyQuery: _react.PropTypes.func.isRequired,
  // TODO: parseQueryString
  parseQuery: _react.PropTypes.func.isRequired
};
StaticRouter.defaultProps = {
  createHref: function createHref(path) {
    return path;
  },
  stringifyQuery: defaultStringifyQuery,
  parseQuery: _queryString.parse
};
StaticRouter.childContextTypes = {
  router: _PropTypes.router.isRequired,
  location: _PropTypes.location.isRequired
};
exports.default = StaticRouter;