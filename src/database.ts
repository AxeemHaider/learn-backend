export interface User {
  id: string;
  name: string;
  age: number;
  address: string;
}

interface Database {
  users: User[];
}

const database: Database = {
  users: [
    {
      id: "1",
      name: "adil",
      age: 35,
      address: "lhr",
    },
    {
      id: "2",
      name: "waqas",
      age: 30,
      address: "ptk",
    },
    {
      id: "3",
      name: "azeem",
      age: 31,
      address: "ptk",
    },
    {
      id: "4",
      name: "waseem",
      age: 40,
      address: "isb",
    },
  ],
};

export default database;
