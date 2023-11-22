import { NextFunction, Response, Request } from "express";

export const getMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
