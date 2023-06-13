import { MongooseError } from "mongoose";
import CustomError from "../utils/errorResponse.js";

import { Request, Response, NextFunction } from "express";

// Not found URL
export const invalidPathHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404);
  res.json({ message: "Resource not found." });
};

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };

  error.message = err.message;

  if (process.env.NODE_ENV == "development") {
    console.log("This is an error");
    console.log(err.message);
  }

  if (err.name == "MongoServerError" && (err as any).code === 11000) {
    let duplicatedField = (err as any).keyValue as Object;
    let fieldKey = Object.keys(duplicatedField).pop();

    error = new CustomError(`${fieldKey} already exists.`, 400);
  }

  if (err.name === "ValidationError") {
    if (typeof (err as any).errors === "object") {
      const errMsg = Object.values((err as any).errors).map(
        (val): string => (val as any).message as string
      );
      error = new CustomError(errMsg, 400);
    }
  }

    if (err.name === "CastError") {
      error = new CustomError(`Resource Not Found.`, 404);
    }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "Server Error" });
};

export default errorHandler;
