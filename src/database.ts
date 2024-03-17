export interface User {
  id?: string;
  name?: string;
  age?: number;
  address?: string;
}

interface Database {
  users: User[];
}

const database: Database = {
  users: [
    { id: "1", name: "adil", age: 23, address: "Kasur" },
    { id: "3", name: "waqas", age: 23, address: "Pattoki" },
    {
      id: "2",
      name: "afran haider",
      age: 500,
      address: "Lahore",
    },
  ],
};

export default database;
