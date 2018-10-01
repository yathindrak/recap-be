const boards = [
  {
    id: 1,
    name: "Board 1",
    description: "This is a board."
  },
  {
    id: 2,
    name: "Board 2",
    description: "This is another board.",
  }
];

const columns = [
  {
    id: 1,
    name: "Pending",
    description: "Still have to do these bro :/",
    order_num: 1
  },
  {
    id: 2,
    name: "In Progress",
    description: "WIP :|",
    order_num: 2
  },
  {
    id: 3,
    name: "Completed",
    description: "Yay done :)",
    order_num: 3
  }
];

const cards = [
  {
    id: 1,
    name: "Pending 1",
    description: "Still have to do these bro :/",
    order_num: 1
  },
  {
    id: 2,
    name: "Pending 2",
    description: "WIP :|",
    order_num: 2
  },
  {
    id: 3,
    name: "Pending 3",
    description: "Yay done :)",
    order_num: 3
  }
];

const board = {
  id: 1,
  name: "Board 1",
  description: "This is a board."
};

module.exports = {
  board,
  cards,
  columns,
  boards
};
