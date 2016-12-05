'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropTypes = require('./PropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Miss = function (_React$Component) {
  _inherits(Miss, _React$Component);

  function Miss(props, context) {
    _classCallCheck(this, Miss);

    // ignore if rendered out of context (probably for unit tests)
    var _this = _possibleConstructorReturn(this, (Miss.__proto__ || Object.getPrototypeOf(Miss)).call(this, props, context));

    if (context.match && !context.serverRouter) {
      _this.unsubscribe = _this.context.match.subscribe(function (matchesFound) {
        _this.setState({
          noMatchesInContext: !matchesFound
        });
      });
    }

    if (context.serverRouter) {
      context.serverRouter.registerMissPresence(context.match.serverRouterIndex);
    }

    _this.state = {
      noMatchesInContext: false
    };
    return _this;
  }

  _createClass(Miss, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          render = _props.render,
          Component = _props.component;
      var noMatchesInContext = this.state.noMatchesInContext;
      var locationProp = this.props.location;

      var location = locationProp || this.context.location;
      var _context = this.context,
          serverRouter = _context.serverRouter,
          match = _context.match;

      var noMatchesOnServerContext = serverRouter && serverRouter.missedAtIndex(match.serverRouterIndex);
      if (noMatchesInContext || noMatchesOnServerContext) {
        return render ? render({ location: location }) : _react2.default.createElement(Component, { location: location });
      } else {
        return null;
      }
    }
  }]);

  return Miss;
}(_react2.default.Component);

Miss.propTypes = {
  children: _react.PropTypes.node,
  location: _PropTypes.location,
  render: _react.PropTypes.func,
  component: _react.PropTypes.func
};
Miss.contextTypes = {
  match: _react.PropTypes.object,
  location: _react.PropTypes.object,
  serverRouter: _react.PropTypes.object
};
exports.default = Miss;