import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import database from "./database";

const app = express();

app.use(morgan("combined"));
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
  const query = req.query;
  res.json(query);
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

app.listen(5000);
