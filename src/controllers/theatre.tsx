import { NextFunction, Response, Request } from "express";

export const getTheatre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
  } catch (error) {
    next(error);
  }
}