'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchPattern = exports.StaticRouter = exports.ServerRouter = exports.MemoryRouter = exports.HashRouter = exports.BrowserRouter = exports.Redirect = exports.NavigationPrompt = exports.Miss = exports.Match = exports.Link = undefined;

var _Link2 = require('./Link');

var _Link3 = _interopRequireDefault(_Link2);

var _Match2 = require('./Match');

var _Match3 = _interopRequireDefault(_Match2);

var _Miss2 = require('./Miss');

var _Miss3 = _interopRequireDefault(_Miss2);

var _Prompt = require('react-history/Prompt');

var _Prompt2 = _interopRequireDefault(_Prompt);

var _Redirect2 = require('./Redirect');

var _Redirect3 = _interopRequireDefault(_Redirect2);

var _BrowserRouter2 = require('./BrowserRouter');

var _BrowserRouter3 = _interopRequireDefault(_BrowserRouter2);

var _HashRouter2 = require('./HashRouter');

var _HashRouter3 = _interopRequireDefault(_HashRouter2);

var _MemoryRouter2 = require('./MemoryRouter');

var _MemoryRouter3 = _interopRequireDefault(_MemoryRouter2);

var _ServerRouter2 = require('./ServerRouter');

var _ServerRouter3 = _interopRequireDefault(_ServerRouter2);

var _StaticRouter2 = require('./StaticRouter');

var _StaticRouter3 = _interopRequireDefault(_StaticRouter2);

var _matchPattern2 = require('./matchPattern');

var _matchPattern3 = _interopRequireDefault(_matchPattern2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Link = _Link3.default;
exports.Match = _Match3.default;
exports.Miss = _Miss3.default;
exports.NavigationPrompt = _Prompt2.default;
exports.Redirect = _Redirect3.default;

// High-level wrappers

exports.BrowserRouter = _BrowserRouter3.default;
exports.HashRouter = _HashRouter3.default;
exports.MemoryRouter = _MemoryRouter3.default;
exports.ServerRouter = _ServerRouter3.default;

// Low-level building block

exports.StaticRouter = _StaticRouter3.default;

// Util for server rendering "pre-render match"

exports.matchPattern = _matchPattern3.default;