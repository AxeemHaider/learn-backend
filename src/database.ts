import { DataSource } from "typeorm";
import User from "./entities/user";
import Job from "./entities/job";

const Database = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: process.env.DB_PASSWORD,
  database: "learn-backend",
  synchronize: true,
  logging: true,
  entities: [User, Job],
  subscribers: [],
  migrations: [],
});

export default Database;
