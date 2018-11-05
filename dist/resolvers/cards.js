"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _server = require("../server");

var _connection = require("../database/connection");

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var CARD_ADDED = 'CARD_ADDED';
var CARD_EDITED = 'CARD_EDITED';
var CARD_DELETED = 'CARD_DELETED';

exports.default = {
    Query: {
        getCards: function getCards(parent, _ref, _ref2) {
            var id = _ref.id;
            var models = _ref2.models;
            return models.Card.findAll();
        },
        getCard: function getCard(parent, _ref3, _ref4) {
            var id = _ref3.id;
            var models = _ref4.models;
            return models.Card.findOne({ where: { id: id } });
        }
    },
    Subscription: {
        cardAdded: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: function subscribe() {
                return _server.pubsub.asyncIterator([CARD_ADDED]);
            }
        },
        cardEdited: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: function subscribe() {
                return _server.pubsub.asyncIterator([CARD_EDITED]);
            }
        },
        cardDeleted: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: function subscribe() {
                return _server.pubsub.asyncIterator([CARD_DELETED]);
            }
        }
    },
    Mutation: {
        createCard: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref6) {
                var models = _ref6.models;
                var card;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return models.Card.create(args);

                            case 3:
                                card = _context.sent;

                                _server.pubsub.publish(CARD_ADDED, { cardAdded: card });
                                return _context.abrupt("return", {
                                    ok: true,
                                    card: card
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

            return function createCard(_x, _x2, _x3) {
                return _ref5.apply(this, arguments);
            };
        }(),
        updateCard: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref8) {
                var models = _ref8.models;
                var card;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return models.Card.update({
                                    name: args.name,
                                    description: args.description
                                }, {
                                    where: { id: args.id }
                                });

                            case 3:
                                card = _context2.sent;


                                _server.pubsub.publish(CARD_EDITED, { cardEdited: card });

                                return _context2.abrupt("return", {
                                    ok: true,
                                    card: card
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

            return function updateCard(_x4, _x5, _x6) {
                return _ref7.apply(this, arguments);
            };
        }(),
        deleteCard: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args, _ref10) {
                var models = _ref10.models;
                var card;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return models.Card.destroy({
                                    where: { id: args.id }
                                });

                            case 3:
                                card = _context3.sent;


                                _server.pubsub.publish(CARD_DELETED, { cardDeleted: card });

                                return _context3.abrupt("return", {
                                    ok: true,
                                    card: card
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

            return function deleteCard(_x7, _x8, _x9) {
                return _ref9.apply(this, arguments);
            };
        }(),

        rearrangeCard: function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, args, _ref12) {
                var models = _ref12.models;

                var indexToAdd, card, prevColCards, indexToRemove, removedCard, newColumnCards, tempArr, _prevColCards;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                indexToAdd = args.order_num;
                                _context4.prev = 1;
                                _context4.next = 4;
                                return models.Card.findOne({ where: args.id });

                            case 4:
                                card = _context4.sent;
                                _context4.next = 7;
                                return models.Card.findAll({
                                    where: { column_id: card.columnId },
                                    order: [['order_num', 'ASC']]
                                });

                            case 7:
                                prevColCards = _context4.sent;


                                // put all cards into an array
                                if ((typeof prevColCards === "undefined" ? "undefined" : _typeof(prevColCards)) !== 'object') {
                                    prevColCards = JSON.parse(prevColCards);
                                }

                                // console.log(JSON.stringify(prevColCards));
                                // console.log("------------------------------")
                                // Remove the card we are rearranging
                                indexToRemove = prevColCards.findIndex(function (item) {
                                    return item.order_num === card.order_num;
                                });
                                removedCard = prevColCards.splice(indexToRemove, 1);


                                prevColCards.map(function (card, index) {
                                    card.order_num = index;
                                });

                                // Add removed card into the new or existing column

                                // Add removed card into a new column

                                if (!(card.columnId !== args.columnId)) {
                                    _context4.next = 25;
                                    break;
                                }

                                _context4.next = 15;
                                return models.Card.findAll({
                                    where: { column_id: args.columnId },
                                    order: [['order_num', 'ASC']]
                                });

                            case 15:
                                newColumnCards = _context4.sent;


                                // add removed card
                                newColumnCards.splice.apply(newColumnCards, [indexToAdd, 0].concat(_toConsumableArray(removedCard)));

                                newColumnCards.map(function (card, index) {
                                    card.order_num = index;
                                });

                                tempArr = [];

                                newColumnCards.map(function (card) {
                                    tempArr.push({
                                        order_num: card.order_num,
                                        columnId: card.columnId
                                    });
                                });
                                console.log(JSON.stringify(tempArr));
                                // await models.Card.bulkCreate(newColumnCards,
                                //     {
                                //         fields:["order_num", "columnId"] ,
                                //         updateOnDuplicate: ["order_num", "columnId"]
                                //     } );

                                // await sequelize.query('CALL sp_reorder_cards(:params )',
                                //     { replacements: {params : ['value1, value2, value3, value4']} })


                                _context4.next = 23;
                                return _connection2.default.query('call sp_reorder_cards(:CardDetails )', { replacements: { CardDetails: tempArr } });

                            case 23:
                                _context4.next = 27;
                                break;

                            case 25:
                                (_prevColCards = prevColCards).splice.apply(_prevColCards, [indexToAdd, 0].concat(_toConsumableArray(removedCard)));

                                prevColCards.map(function (card, index) {
                                    card.order_num = index;
                                });

                                // console.log(JSON.stringify(prevColCards));

                            case 27:
                                return _context4.abrupt("return", {
                                    ok: true,
                                    card: card
                                });

                            case 30:
                                _context4.prev = 30;
                                _context4.t0 = _context4["catch"](1);

                                console.log(_context4.t0);
                                return _context4.abrupt("return", {
                                    ok: false,
                                    errors: formatErrors(_context4.t0, models)
                                });

                            case 34:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, undefined, [[1, 30]]);
            }));

            return function rearrangeCard(_x10, _x11, _x12) {
                return _ref11.apply(this, arguments);
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