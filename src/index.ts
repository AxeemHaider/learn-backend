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
  const age = user.age;
  user.id = Math.floor(Math.random() * 10000);

  database.users.push(user);

  res.json(user);
});

app.post("/users/:id", (req, res) => {
  const id = req.params.id;
  const userData = req.body;

  // res.status(400).json({error: {code: 400, message: "Bad Request! missing name"}})

  //upsert
  const user = database.users.find((u) => u.id == id);
  if (user === undefined) {
    const id = req.params.id;
    const userData = req.body;
    const newData = { id, ...userData };
    database.users.push(userData);
    return res.json(newData);
  } else if (user.id === id) {
    const userIndex = database.users.findIndex((u) => u.id == id);
    database.users[userIndex] = { ...database.users[userIndex], ...userData };

    return res.json(database.users[userIndex]);
  }

  console.log(user);
  res.json(user);
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

// Get all users
app.get("/users", (req, res) => {
  const users = database.users;
  return res.json(users);
});

// Search user
app.get("/users/search", (req, res) => {
  const address: string = req.query.address as string;
  const name: string = req.query.name as string;
  const age = req.query.age as string;

  let userData: any;
  if (address && name) {
    userData = database.users.filter(
      (e) =>
        e.address?.toLowerCase() === address.toLowerCase() &&
        e.name?.toLowerCase() === name.toLowerCase()
    );
  } else if (name) {
    userData = database.users.filter(
      (e) => e.name?.toLowerCase() === name.toLowerCase()
    );
  } else if (address) {
    userData = database.users.filter(
      (e) => e.address?.toLowerCase() === address.toLowerCase()
    );
  } else if (age) {
    if (age.includes(".")) {
      const operatorAndValue = age.split(".");
      const op = operatorAndValue[0];
      const value = parseInt(operatorAndValue[1]);

      if (op === "lt") {
        userData = database.users.filter((e) => e.age < value);
      } else if (op === "lte") {
        userData = database.users.filter((e) => e.age <= value);
      }
    } else {
      const value = parseInt(age);
      userData = database.users.filter((e) => e.age === value);
    }
  } else {
    userData = database.users;
  }

  res.json(userData);
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
