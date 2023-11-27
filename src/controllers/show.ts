import { NextFunction, Response, Request } from "express";
import ShowDAO  from "../dao/show";
import { ShowRequesProps } from "../types/show";

export const getShowsByTheatreAndDate = async (
  req: ShowRequesProps,
  res: Response,
  next: NextFunction
) => {
  const { theatreId, date } = req;
  try {
    const shows = await ShowDAO.getShowsByTheatreAndDate(theatreId, date);
    res.status(200).json(shows);
  } catch (error) {
    next(error);
  }
}

// Controller function to create a new show
export const createShow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { theatreID, movieID, showDate, showTime } = req.body;
    const newShow = await ShowDAO.createShow(theatreID, movieID, showDate, showTime);
    res.status(201).json(newShow);
  } catch (error) {
    next(error);
  }
};

// Controller function to update a show by its ID
export const updateShow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { theatreID, movieID, showDate, showTime } = req.body;
    const updatedShow = await ShowDAO.updateShow(parseInt(id, 10), theatreID, movieID, showDate, showTime);

    if (updatedShow) {
      res.status(200).json(updatedShow);
    } else {
      res.status(404).json({ message: 'Show not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Controller function to delete a show by its ID
export const deleteShow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedShow = await ShowDAO.deleteShow(parseInt(id, 10));

    if (deletedShow) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Show not found' });
    }
  } catch (error) {
    next(error);
  }
};