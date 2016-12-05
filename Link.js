'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropTypes = require('./PropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (_this.props.onClick) _this.props.onClick(event);

      if (!event.defaultPrevented && // onClick prevented default
      !_this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) && isLeftClickEvent(event)) {
        event.preventDefault();
        _this.context.router.transitionTo(_this.props.to);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Link, [{
    key: 'render',
    value: function render() {
      var router = this.context.router;

      var _props = this.props,
          to = _props.to,
          style = _props.style,
          activeStyle = _props.activeStyle,
          className = _props.className,
          activeClassName = _props.activeClassName,
          location = _props.location,
          getIsActive = _props.isActive,
          activeOnlyWhenExact = _props.activeOnlyWhenExact,
          rest = _objectWithoutProperties(_props, ['to', 'style', 'activeStyle', 'className', 'activeClassName', 'location', 'isActive', 'activeOnlyWhenExact']);

      var currentLocation = location || this.context.location;

      var isActive = getIsActive(currentLocation, createLocationDescriptor(to), this.props);

      // Maybe we should use <Match> here? Not sure how the custom `isActive`
      // prop would shake out, also, this check happens a LOT so maybe its good
      // to optimize here w/ a faster isActive check, so we'd need to bench mark
      // any attempt at changing to use <Match>
      return _react2.default.createElement('a', _extends({}, rest, {
        href: router ? router.createHref(to) : to,
        onClick: this.handleClick,
        style: isActive ? _extends({}, style, activeStyle) : style,
        className: isActive ? [className, activeClassName].join(' ').trim() : className
      }));
    }
  }]);

  return Link;
}(_react2.default.Component);

// we should probably use LocationUtils.createLocationDescriptor


Link.propTypes = {
  to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]).isRequired,
  activeStyle: _react.PropTypes.object,
  activeClassName: _react.PropTypes.string,
  location: _react.PropTypes.object,
  activeOnlyWhenExact: _react.PropTypes.bool,
  isActive: _react.PropTypes.func,

  // props we have to deal with but aren't necessarily
  // part of the Link API
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,
  target: _react.PropTypes.string,
  onClick: _react.PropTypes.func
};
Link.defaultProps = {
  activeOnlyWhenExact: false,
  className: '',
  activeClassName: '',
  style: {},
  activeStyle: {},
  isActive: function isActive(location, to, props) {
    return pathIsActive(to.pathname, location.pathname, props.activeOnlyWhenExact) && queryIsActive(to.query, location.query);
  }
};
Link.contextTypes = {
  router: _PropTypes.router, // TODO: This should be required, lazy testers be damned
  location: _PropTypes.location // TODO: This should also be required
};
var createLocationDescriptor = function createLocationDescriptor(to) {
  return (typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' ? to : { pathname: to };
};

var pathIsActive = function pathIsActive() {
  var to = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var pathname = arguments[1];
  var activeOnlyWhenExact = arguments[2];
  return activeOnlyWhenExact ? pathname === to : new RegExp(to.replace(/\//ig, '\\/') + '(\\/|$)').test(pathname);
};

var queryIsActive = function queryIsActive(query, activeQuery) {
  if (activeQuery == null) return query == null;

  if (query == null) return true;

  return deepEqual(query, activeQuery);
};

var isLeftClickEvent = function isLeftClickEvent(event) {
  return event.button === 0;
};

var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

var deepEqual = function deepEqual(a, b) {
  if (a == b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return deepEqual(item, b[index]);
    });
  }

  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
    for (var p in a) {
      if (!Object.prototype.hasOwnProperty.call(a, p)) {
        continue;
      }

      if (a[p] === undefined) {
        if (b[p] !== undefined) {
          return false;
        }
      } else if (!Object.prototype.hasOwnProperty.call(b, p)) {
        return false;
      } else if (!deepEqual(a[p], b[p])) {
        return false;
      }
    }

    return true;
  }

  return String(a) === String(b);
};

exports.default = Link;