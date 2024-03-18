import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import database from "./database";
import { DataSource } from "typeorm";
import User from "./entities/user";

const AppDataSource = new DataSource({
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

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

// Create User
app.post("/users", async (req, res) => {
  const user = req.body;
  const userRepo = AppDataSource.getRepository(User);

  const newUser = new User();
  newUser.name = user.name;
  newUser.email = user.email;
  newUser.password = user.password;

  const newlyCreatedUser = await userRepo.save(newUser);

  res.json(newlyCreatedUser);
});

// Get all users
app.get("/users", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();
  res.json(users);
  // const users = database.users;
  // return res.json(users);
});

// Get user by id
app.get("/users/:id", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const id = req.params.id;
  const user = await userRepo.findOneBy({ id });
  res.json(user);
  // const id = req.params.id;
  // const user = database.users.find((u) => u.id == id);
  // res.json(user);
});

// Delete user
app.delete("/users/:id", (req, res) => {
  // const id = req.params.id;
  // database.users = database.users.filter((u) => u.id != id);
  // res.json(database.users);
});

// Update user
app.patch("/users/:id", (req, res) => {
  // const id = req.params.id;
  // const updates = req.body;
  // const userIndex = database.users.findIndex((u) => u.id == id);
  // database.users[userIndex] = { ...database.users[userIndex], ...updates };
  // res.json(database.users[userIndex]);
});

const main = async () => {
  await AppDataSource.initialize();

  app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
  });
};

main();
