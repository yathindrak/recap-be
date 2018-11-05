"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _server = require("../server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var COMMENT_ADDED = 'COMMENT_ADDED';

exports.default = {
    Query: {
        getComments: function getComments(parent, _ref, _ref2) {
            var id = _ref.id;
            var models = _ref2.models;
            return models.Comment.findAll();
        },
        getComment: function getComment(parent, _ref3, _ref4) {
            var cardId = _ref3.cardId,
                useridentity = _ref3.useridentity;
            var models = _ref4.models;
            return models.Comment.findOne({
                where: {
                    cardId: cardId,
                    useridentity: useridentity
                }
            });
        },
        getCommentsByUser: function getCommentsByUser(parent, _ref5, _ref6) {
            var useridentity = _ref5.useridentity,
                boardId = _ref5.boardId;
            var models = _ref6.models;
            return models.Comment.findAll({
                where: {
                    useridentity: useridentity,
                    boardId: boardId
                }
            });
        },
        getCommentsByBoard: function getCommentsByBoard(parent, _ref7, _ref8) {
            var boardId = _ref7.boardId;
            var models = _ref8.models;
            return models.Comment.findAll({
                where: {
                    boardId: boardId
                },
                order: [['createdAt', 'ASC']]
            });
        }
    },
    Subscription: {
        commentAdded: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: function subscribe() {
                return _server.pubsub.asyncIterator([COMMENT_ADDED]);
            }
        }
    },
    Mutation: {
        addComment: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref10, _ref11) {
                var message = _ref10.message,
                    cardId = _ref10.cardId,
                    useridentity = _ref10.useridentity,
                    boardId = _ref10.boardId;
                var models = _ref11.models;
                var comment;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return models.Comment.create({
                                    useridentity: useridentity, message: message, cardId: cardId, boardId: boardId
                                });

                            case 3:
                                comment = _context.sent;


                                _server.pubsub.publish(COMMENT_ADDED, { commentAdded: comment });

                                return _context.abrupt("return", {
                                    ok: true,
                                    comment: comment
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

            return function addComment(_x, _x2, _x3) {
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