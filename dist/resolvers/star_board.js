"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _server = require("../server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var STARBOARD_ADDED = 'STARBOARD_ADDED';
var STARBOARD_DELETED = 'STARBOARD_DELETED';

exports.default = {
    Query: {
        getStarBoards: function getStarBoards(parent, _ref, _ref2) {
            var id = _ref.id;
            var models = _ref2.models;
            return models.StarBoard.findAll();
        },
        getStarBoard: function getStarBoard(parent, _ref3, _ref4) {
            var boardId = _ref3.boardId,
                useridentity = _ref3.useridentity;
            var models = _ref4.models;
            return models.StarBoard.findOne({
                where: {
                    boardId: boardId,
                    useridentity: useridentity
                }
            });
        },
        getStarredBoardsByUser: function getStarredBoardsByUser(parent, _ref5, _ref6) {
            var useridentity = _ref5.useridentity;
            var models = _ref6.models;
            return models.StarBoard.findAll({
                where: {
                    useridentity: useridentity
                }
            });
        }
    },
    Subscription: {
        starBoardAdded: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: function subscribe() {
                return _server.pubsub.asyncIterator([STARBOARD_ADDED]);
            }
        },
        starBoardDeleted: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: function subscribe() {
                return _server.pubsub.asyncIterator([STARBOARD_DELETED]);
            }
        }
    },
    Mutation: {
        starBoard: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref8, _ref9) {
                var is_voted = _ref8.is_voted,
                    boardId = _ref8.boardId,
                    useridentity = _ref8.useridentity;
                var models = _ref9.models;
                var star_board;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return models.StarBoard.create({
                                    is_voted: is_voted, boardId: boardId, useridentity: useridentity
                                });

                            case 3:
                                star_board = _context.sent;

                                _server.pubsub.publish(STARBOARD_ADDED, { starBoardAdded: star_board });

                                return _context.abrupt("return", {
                                    ok: true,
                                    star_board: star_board
                                });

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context["catch"](0);
                                return _context.abrupt("return", {
                                    ok: false,
                                    errors: formatErrors(_context.t0, models)
                                });

                            case 11:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, undefined, [[0, 8]]);
            }));

            return function starBoard(_x, _x2, _x3) {
                return _ref7.apply(this, arguments);
            };
        }(),
        removeStarBoard: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, _ref11, _ref12) {
                var boardId = _ref11.boardId,
                    useridentity = _ref11.useridentity;
                var models = _ref12.models;
                var star_board;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return models.StarBoard.destroy({
                                    where: {
                                        boardId: boardId,
                                        useridentity: useridentity
                                    }
                                });

                            case 3:
                                star_board = _context2.sent;

                                _server.pubsub.publish(STARBOARD_DELETED, { starBoardDeleted: star_board });

                                return _context2.abrupt("return", {
                                    ok: true
                                });

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2["catch"](0);
                                return _context2.abrupt("return", {
                                    ok: false,
                                    errors: formatErrors(_context2.t0, models)
                                });

                            case 11:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, undefined, [[0, 8]]);
            }));

            return function removeStarBoard(_x4, _x5, _x6) {
                return _ref10.apply(this, arguments);
            };
        }()
    }
};


var formatErrors = function formatErrors(e, models) {
    if (e instanceof models.sequelize.ValidationError) {
        return e.errors.map(function (x) {
            return _lodash2.default.pick(x, ['path', 'message']);
        });
    }
    return [{ path: 'name', message: 'something went wrong' }];
};