import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import Database from "./database";
import userRoutes from "./routes/user";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

userRoutes(app);

const main = async () => {
  await Database.initialize();

  app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
  });
};

main();
