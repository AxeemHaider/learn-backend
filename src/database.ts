interface User {
  id: string;
  name: string;
  age: number;
  address: string;
}

interface Database {
  users: User[];
}

const database: Database = {
  users: [],
};

export default database;
