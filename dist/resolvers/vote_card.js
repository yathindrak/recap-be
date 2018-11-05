"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _server = require("../server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var VOTE_CARD_ADDED = 'VOTE_CARD_ADDED';
var VOTE_CARD_DELETED = 'VOTE_CARD_DELETED';

exports.default = {
    Query: {
        getVoteCards: function getVoteCards(parent, _ref, _ref2) {
            var id = _ref.id;
            var models = _ref2.models;
            return models.VoteCard.findAll();
        },
        getVoteCard: function getVoteCard(parent, _ref3, _ref4) {
            var cardId = _ref3.cardId,
                useridentity = _ref3.useridentity;
            var models = _ref4.models;
            return models.VoteCard.findOne({
                where: {
                    cardId: cardId,
                    useridentity: useridentity
                }
            });
        },
        getVoteCardsByBoard: function getVoteCardsByBoard(parent, _ref5, _ref6) {
            var boardId = _ref5.boardId;
            var models = _ref6.models;
            return models.VoteCard.findAll({
                where: {
                    boardId: boardId
                }
            });
        },
        getVoteCardsByUser: function getVoteCardsByUser(parent, _ref7, _ref8) {
            var useridentity = _ref7.useridentity,
                boardId = _ref7.boardId;
            var models = _ref8.models;
            return models.VoteCard.findAll({
                where: {
                    useridentity: useridentity,
                    boardId: boardId
                }
            });
        }
    },
    Subscription: {
        voteCardAdded: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: function subscribe() {
                return _server.pubsub.asyncIterator([VOTE_CARD_ADDED]);
            }
        },
        voteCardDeleted: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: function subscribe() {
                return _server.pubsub.asyncIterator([VOTE_CARD_DELETED]);
            }
        }
    },
    Mutation: {
        starCard: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref10, _ref11) {
                var is_voted = _ref10.is_voted,
                    cardId = _ref10.cardId,
                    useridentity = _ref10.useridentity,
                    boardId = _ref10.boardId;
                var models = _ref11.models;
                var vote_card;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return models.VoteCard.create({
                                    is_voted: is_voted, cardId: cardId, useridentity: useridentity, boardId: boardId
                                });

                            case 3:
                                vote_card = _context.sent;

                                _server.pubsub.publish(VOTE_CARD_ADDED, { voteCardAdded: vote_card });

                                return _context.abrupt("return", {
                                    ok: true,
                                    vote_card: vote_card
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

            return function starCard(_x, _x2, _x3) {
                return _ref9.apply(this, arguments);
            };
        }(),
        removeStarCard: function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, _ref13, _ref14) {
                var cardId = _ref13.cardId,
                    useridentity = _ref13.useridentity,
                    boardId = _ref13.boardId;
                var models = _ref14.models;
                var vote_card;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return models.VoteCard.destroy({
                                    where: {
                                        cardId: cardId,
                                        useridentity: useridentity
                                    }
                                });

                            case 3:
                                vote_card = _context2.sent;

                                _server.pubsub.publish(VOTE_CARD_DELETED, { voteCardDeleted: vote_card });

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

            return function removeStarCard(_x4, _x5, _x6) {
                return _ref12.apply(this, arguments);
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