import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import database, { User } from "./database";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

// Create User
app.post("/users", (req, res) => {
  const user = req.body;
  user.id = Math.floor(Math.random() * 10000);

  database.users.push(user);

  res.json(user);
});

// Get all users
app.get("/users", (req, res) => {
  const users = database.users;
  return res.json(users);
});

// Search user
app.get("/users/search", (req, res) => {
  const address: string = req.query.address as string;
  const name: string = req.query.name as string;
  console.log(req.query);

  let userAddress: any;
  if (address) {
    userAddress = database.users.filter(
      (e) => e.address?.toLowerCase() === address.toLowerCase()
    );
  }

  let userName: any;
  if (name) {
    userName = database.users.filter(
      (e) => e.name?.toLowerCase() === name.toLowerCase()
    );
  }
  let answer;
  if (userAddress && userName) {
    answer = [...userAddress, ...userName];
  }

  res.json(answer);
});

// Get user by id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = database.users.find((u) => u.id == id);
  res.json(user);
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  database.users = database.users.filter((u) => u.id != id);

  res.json(database.users);
});

// Update user
app.patch("/users/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  const userIndex = database.users.findIndex((u) => u.id == id);
  database.users[userIndex] = { ...database.users[userIndex], ...updates };

  res.json(database.users[userIndex]);
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
