import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
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

  // const newUser: User = {
  //   name: user.name,
  //   email: user.email,
  //   password: user.password
  // }

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
app.delete("/users/:id", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const id = req.params.id;
  const updated = await userRepo.delete(id);
  // database.users = database.users.filter((u) => u.id != id);
  res.json(updated);
});

// Update user
app.patch("/users/:id", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);

  const id = req.params.id;
  const user = req.body;
  const updated = await userRepo.update(id, user);
  res.json(updated);
});

const main = async () => {
  await AppDataSource.initialize();

  app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
  });
};

main();
