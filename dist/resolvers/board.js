"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require("../database/models");

var _models2 = _interopRequireDefault(_models);

var _server = require("../server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var BOARD_ADDED = 'BOARD_ADDED';
var BOARD_EDITED = 'BOARD_EDITED';
var BOARD_DELETED = 'BOARD_DELETED';

exports.default = {
    Query: {
        getBoards: function getBoards(parent, _ref, _ref2) {
            var id = _ref.id;
            var models = _ref2.models;
            return models.Board.findAll();
        },
        getBoard: function getBoard(parent, _ref3, _ref4) {
            var id = _ref3.id;
            var models = _ref4.models;
            return models.Board.findOne({ where: { id: id } });
        }
    },
    Board: {
        columns: function columns(board) {
            return _models2.default.Column.findAll({ where: { board_id: board.id } });
        }
    },
    Column: {
        cards: function cards(column) {
            return _models2.default.Card.findAll({ where: { column_id: column.id } });
        }
    },
    Subscription: {
        boardAdded: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: function subscribe() {
                return _server.pubsub.asyncIterator([BOARD_ADDED]);
            }
        },
        boardEdited: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: function subscribe() {
                return _server.pubsub.asyncIterator([BOARD_EDITED]);
            }
        },
        boardDeleted: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: function subscribe() {
                return _server.pubsub.asyncIterator([BOARD_DELETED]);
            }
        }
    },
    Mutation: {
        createBoard: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref6) {
                var models = _ref6.models;
                var board;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return models.Board.create(args);

                            case 3:
                                board = _context.sent;

                                _server.pubsub.publish(BOARD_ADDED, { boardAdded: board });
                                return _context.abrupt("return", {
                                    ok: true,
                                    board: board
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

            return function createBoard(_x, _x2, _x3) {
                return _ref5.apply(this, arguments);
            };
        }(),

        updateBoard: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref8) {
                var models = _ref8.models;
                var board;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return models.Board.update({
                                    name: args.name,
                                    description: args.description
                                }, {
                                    where: { id: args.id }
                                });

                            case 3:
                                board = _context2.sent;


                                _server.pubsub.publish(BOARD_EDITED, { boardEdited: board });

                                return _context2.abrupt("return", {
                                    ok: true,
                                    board: board
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

            return function updateBoard(_x4, _x5, _x6) {
                return _ref7.apply(this, arguments);
            };
        }(),
        deleteBoard: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args, _ref10) {
                var models = _ref10.models;
                var board;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return models.Board.destroy({
                                    where: { id: args.id }
                                });

                            case 3:
                                board = _context3.sent;


                                _server.pubsub.publish(BOARD_DELETED, { boardDeleted: board });

                                return _context3.abrupt("return", {
                                    ok: true,
                                    board: board
                                });

                            case 8:
                                _context3.prev = 8;
                                _context3.t0 = _context3["catch"](0);
                                return _context3.abrupt("return", {
                                    ok: false,
                                    errors: formatErrors(_context3.t0, models)
                                });

                            case 11:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, undefined, [[0, 8]]);
            }));

            return function deleteBoard(_x7, _x8, _x9) {
                return _ref9.apply(this, arguments);
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