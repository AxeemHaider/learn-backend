import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { Request, Response, NextFunction } from "express";

const requestValidatation = (DtoClass: any) => {
  return (req: Request, res: Response, next?: NextFunction) => {
    const body = req.body;

    try {
      const requestDto = plainToInstance(DtoClass, body);
      const errors = validateSync(requestDto);

      if (errors.length) {
        let invalidParams: any[] = [];
        for (const error of errors) {
          invalidParams = invalidParams.concat(error.constraints);
        }

        return res.status(400).json({
          error: {
            code: 400,
            message: "Bad Request!, missing required fields",
            errors: invalidParams,
          },
        });
      }
    } catch (e) {
      console.log("Error in request validator middleware");
      console.error(e);
    }

    next();
  };
};

export default requestValidatation;
