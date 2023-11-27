import { Response, Request, NextFunction  } from "express";
import { APIError } from "../utils/errors";
// import logger from "../logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // logger.error(err.message);
  if(err instanceof APIError) {
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({ message: "Server error" });
}