import { NextFunction, Response, Request } from "express";

export const getTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
  } catch (error) {
    next(error);
  }
}