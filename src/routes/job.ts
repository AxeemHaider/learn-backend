import { Express } from "express";
import jwt from "jsonwebtoken";
import Database from "../database";
import Job from "../entities/job";

const jobRoutes = (app: Express) => {
  const jobRepo = Database.getRepository(Job);

  app.post("/jobs", async (req, res) => {
    const body = req.body;
    const headers = req.headers.authorization;

    if (!headers) {
      return res.status(403).json({
        error: {
          code: 403,
          message: "Forbidden access! you don't have permission to access this",
        },
      });
    }

    const headerParts = headers.split(" ");
    const token = headerParts[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_PASSWORD);

      const job = new Job();
      job.title = body.title;

      const newJob = await jobRepo.save(job);

      res.json(newJob);
    } catch (e: any) {
      res.status(401).json({
        error: {
          code: 401,
          message: e.message,
        },
      });
    }
  });
};

export default jobRoutes;
