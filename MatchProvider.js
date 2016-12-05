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

var MatchProvider = function (_React$Component) {
  _inherits(MatchProvider, _React$Component);

  function MatchProvider(props) {
    _classCallCheck(this, MatchProvider);

    var _this = _possibleConstructorReturn(this, (MatchProvider.__proto__ || Object.getPrototypeOf(MatchProvider)).call(this, props));

    _this.addMatch = function (match) {
      _this.matches.push(match);
    };

    _this.removeMatch = function (match) {
      _this.matches.splice(_this.matches.indexOf(match), 1);
    };

    _this.parent = props.match;
    // React doesn't support a parent calling `setState` from an descendant's
    // componentWillMount, so we use an instance property to track matches
    // **IMPORTANT** we must mutate matches, never reassign, in order for
    // server rendering to work
    _this.matches = [];
    _this.subscribers = [];
    _this.hasMatches = null; // use null for initial value
    _this.serverRouterIndex = null;
    return _this;
  }

  _createClass(MatchProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return {
        match: {
          addMatch: this.addMatch,
          removeMatch: this.removeMatch,
          matches: this.matches,
          parent: this.parent,
          serverRouterIndex: this.serverRouterIndex,
          subscribe: function subscribe(fn) {
            _this2.subscribers.push(fn);
            return function () {
              _this2.subscribers.splice(_this2.subscribers.indexOf(fn), 1);
            };
          }
        }
      };
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.notifySubscribers();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var serverRouter = this.context.serverRouter;

      if (serverRouter) {
        this.serverRouterIndex = serverRouter.registerMatchContext(this.matches);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.notifySubscribers();
    }
  }, {
    key: 'notifySubscribers',
    value: function notifySubscribers() {
      var _this3 = this;

      // React's contract is that cDM of descendants is called before cDM of
      // ancestors, so here we can safely check if we found a match
      if (this.subscribers.length) {
        var hadMatches = this.hasMatches;
        this.hasMatches = this.matches.length !== 0;
        // optimization, don't notify if nothing changed initial will be null, so
        // we can get initial render correct
        if (this.hasMatches !== hadMatches) {
          this.subscribers.forEach(function (fn) {
            return fn(_this3.hasMatches);
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return MatchProvider;
}(_react2.default.Component);

MatchProvider.propTypes = {
  match: _react.PropTypes.any,
  children: _react.PropTypes.node
};
MatchProvider.childContextTypes = {
  match: _PropTypes.matchContext.isRequired
};
MatchProvider.contextTypes = {
  serverRouter: _react.PropTypes.object
};
exports.default = MatchProvider;