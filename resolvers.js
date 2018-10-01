const db = require('./database/connection');
const {board, boards, cards, columns} = require('./mocks');

// let connectionPool;
// db.connect().then(pool => {
//     connectionPool = pool;
// });

// TODO: Parameterize getBoard
const resolvers = {
  Query: {
    getBoards: () => boards,
    getBoard: () => board
  },
  Board: {
    columns(board) {
        return new Promise(((resolve, reject) => {
            // connectionPool.request().query('select * from board')
            //     .then(result => {
            //       resolve(columns);
            //     })
            //     .catch(reject);
        }));
    }
  },
  Column: {
    cards(column) {
      console.log("Get cards for column: " + JSON.stringify(column));
      return cards
    }
  }
};

module.exports = resolvers;
