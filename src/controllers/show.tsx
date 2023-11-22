import { NextFunction, Response, Request } from "express";

export const getShow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
  } catch (error) {
    next(error);
  }
}