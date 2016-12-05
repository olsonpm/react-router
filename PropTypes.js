'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.historyContext = exports.action = exports.router = exports.location = exports.history = exports.matchContext = undefined;

var _react = require('react');

var matchContext = exports.matchContext = _react.PropTypes.shape({
  addMatch: _react.PropTypes.func.isRequired,
  removeMatch: _react.PropTypes.func.isRequired
});

var history = exports.history = _react.PropTypes.shape({
  listen: _react.PropTypes.func.isRequired,
  listenBefore: _react.PropTypes.func.isRequired,
  push: _react.PropTypes.func.isRequired,
  replace: _react.PropTypes.func.isRequired,
  go: _react.PropTypes.func.isRequired
});

var location = exports.location = _react.PropTypes.shape({
  pathname: _react.PropTypes.string.isRequired,
  search: _react.PropTypes.string.isRequired,
  hash: _react.PropTypes.string.isRequired,
  state: _react.PropTypes.any,
  key: _react.PropTypes.string
});

var router = exports.router = _react.PropTypes.shape({
  createHref: _react.PropTypes.func.isRequired,
  transitionTo: _react.PropTypes.func.isRequired,
  replaceWith: _react.PropTypes.func.isRequired,
  blockTransitions: _react.PropTypes.func.isRequired
});

var action = exports.action = _react.PropTypes.oneOf(['PUSH', 'REPLACE', 'POP']);

var historyContext = exports.historyContext = _react.PropTypes.shape({
  push: _react.PropTypes.func.isRequired,
  replace: _react.PropTypes.func.isRequired,
  go: _react.PropTypes.func.isRequired
});