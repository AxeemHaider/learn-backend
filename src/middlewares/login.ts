import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const loginMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
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
      (req as any).user = payload as any;

      next();
    } catch (e: any) {
      res.status(401).json({
        error: {
          code: 401,
          message: e.message,
        },
      });
    }
  };
};

export default loginMiddleware;
