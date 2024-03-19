import { Express } from "express";
import Database from "../database";
import User from "../entities/user";
import requestValidatation from "../middlewares/request-validation";
import { UserCreateRequest } from "../dto/user";

const userRoutes = (app: Express) => {
  const userRepo = Database.getRepository(User);

  // Create User
  app.post(
    "/users",
    requestValidatation(UserCreateRequest),
    async (req, res) => {
      const user = req.body;

      const newUser = new User();
      newUser.name = user.name;
      newUser.email = user.email;
      newUser.password = user.password;

      const newlyCreatedUser = await userRepo.save(newUser);

      res.json(newlyCreatedUser);
    },
  );

  // Get all users
  app.get("/users", async (req, res) => {
    const users = await userRepo.find();
    res.json(users);
  });

  // Get user by id
  app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = await userRepo.findOneBy({ id });
    res.json(user);
  });

  // Delete user
  app.delete("/users/:id", (req, res) => {});

  // Update user
  app.patch("/users/:id", (req, res) => {});
};

export default userRoutes;
