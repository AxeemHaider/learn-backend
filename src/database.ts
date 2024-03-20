import { DataSource } from "typeorm";
import User from "./entities/user";
import Product from "./entities/product";

const Database = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "learn-backend",
  synchronize: true,
  logging: true,
  entities: [User, Product],
  subscribers: [],
  migrations: [],
});

export default Database;
