import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import Database from "./database";
import userRoutes from "./routes/user";
import jobRoutes from "./routes/job";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

userRoutes(app);
jobRoutes(app);

const main = async () => {
  await Database.initialize();

  app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
  });
};

main();
