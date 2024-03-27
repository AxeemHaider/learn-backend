import { Express } from "express";
import Database from "../database";
import Job from "../entities/job";
import loginMiddleware from "../middlewares/login";

interface User {
  user_id: string;
  name: string;
}

const jobRoutes = (app: Express) => {
  const jobRepo = Database.getRepository(Job);

  app.post("/jobs", loginMiddleware(), async (req, res) => {
    const body = req.body;
    const loggedInUser = (req as any).user as User;

    const job = new Job();
    job.title = body.title;

    const newJob = await jobRepo.save(job);

    return res.json(loggedInUser);
  });
};

export default jobRoutes;
