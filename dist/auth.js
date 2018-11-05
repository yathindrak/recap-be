'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tryLogin = exports.refreshTokens = exports.createTokens = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createTokens = exports.createTokens = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user, secret, secret2) {
        var createToken, createRefreshToken;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        createToken = _jsonwebtoken2.default.sign({
                            user: _lodash2.default.pick(user, ['useridentity'])
                        }, secret, {
                            expiresIn: '1h'
                        });
                        createRefreshToken = _jsonwebtoken2.default.sign({
                            user: _lodash2.default.pick(user, 'useridentity')
                        }, secret2, {
                            expiresIn: '7d'
                        });
                        return _context.abrupt('return', [createToken, createRefreshToken]);

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function createTokens(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var refreshTokens = exports.refreshTokens = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(token, refreshToken, models, SECRET, SECRET2) {
        var userId, _jwt$decode, useridentity, user, refreshSecret, _ref3, _ref4, newToken, newRefreshToken;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        userId = 0;
                        _context2.prev = 1;
                        _jwt$decode = _jsonwebtoken2.default.decode(refreshToken), useridentity = _jwt$decode.user.useridentity;

                        userId = useridentity;
                        _context2.next = 9;
                        break;

                    case 6:
                        _context2.prev = 6;
                        _context2.t0 = _context2['catch'](1);
                        return _context2.abrupt('return', {});

                    case 9:
                        if (userId) {
                            _context2.next = 11;
                            break;
                        }

                        return _context2.abrupt('return', {});

                    case 11:
                        _context2.next = 13;
                        return models.User.findOne({ where: { useridentity: userId }, raw: true });

                    case 13:
                        user = _context2.sent;

                        if (user) {
                            _context2.next = 16;
                            break;
                        }

                        return _context2.abrupt('return', {});

                    case 16:
                        refreshSecret = user.useridentity + SECRET2;
                        _context2.prev = 17;

                        _jsonwebtoken2.default.verify(refreshToken, refreshSecret);
                        _context2.next = 24;
                        break;

                    case 21:
                        _context2.prev = 21;
                        _context2.t1 = _context2['catch'](17);
                        return _context2.abrupt('return', {});

                    case 24:
                        _context2.next = 26;
                        return createTokens(user, SECRET, refreshSecret);

                    case 26:
                        _ref3 = _context2.sent;
                        _ref4 = _slicedToArray(_ref3, 2);
                        newToken = _ref4[0];
                        newRefreshToken = _ref4[1];
                        return _context2.abrupt('return', {
                            token: newToken,
                            refreshToken: newRefreshToken,
                            user: user
                        });

                    case 31:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[1, 6], [17, 21]]);
    }));

    return function refreshTokens(_x4, _x5, _x6, _x7, _x8) {
        return _ref2.apply(this, arguments);
    };
}();

var tryLogin = exports.tryLogin = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(useridentity, models, SECRET, SECRET2) {
        var user, refreshTokenSecret, _ref6, _ref7, token, refreshToken;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return models.User.findOne({ where: { useridentity: useridentity }, raw: true });

                    case 2:
                        user = _context3.sent;

                        if (user) {
                            _context3.next = 7;
                            break;
                        }

                        _context3.next = 6;
                        return models.User.create({
                            useridentity: useridentity
                        });

                    case 6:
                        user = _context3.sent;

                    case 7:
                        refreshTokenSecret = user.useridentity + SECRET2;
                        _context3.next = 10;
                        return createTokens(user, SECRET, refreshTokenSecret);

                    case 10:
                        _ref6 = _context3.sent;
                        _ref7 = _slicedToArray(_ref6, 2);
                        token = _ref7[0];
                        refreshToken = _ref7[1];
                        return _context3.abrupt('return', {
                            ok: true,
                            token: token,
                            refreshToken: refreshToken
                        });

                    case 15:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function tryLogin(_x9, _x10, _x11, _x12) {
        return _ref5.apply(this, arguments);
    };
}();