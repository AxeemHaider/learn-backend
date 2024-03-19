import { DataSource } from "typeorm";
import User from "./entities/user";

const Database = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "learn-backend",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});

export default Database;
