import { NextFunction, Response, Request } from "express";
import TheatreDAO from '../dao/theatre';
// import { TheatreRequestProps } from "../types/theatre";

// Controller function to get all theatres
export const getTheatres = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const theatres = await TheatreDAO.getAllTheatres();
    res.status(200).json(theatres);
  } catch (error) {
    next(error);
  }
}

export const getTheatreById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const theatre = await TheatreDAO.getTheatreById(Number(id));

    if (!theatre) {
      return res.status(404).json({ message: "Theater not found" });
    }

    res.status(200).json(theatre);
  } catch (error) {
    next(error);
  }
}

// Controller function to get all theatres by city
export const getTheatresByCity = async (req: Request, res: Response, next: NextFunction) => {
  const { city } = req.params;
  try {
    const theatres = await TheatreDAO.getTheatresByCity(city);
    res.status(200).json(theatres);
  } catch (err) {
    next(err);
  }
};

// Controller function to create a new theatre
export const createTheatre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, location } = req.body;
    const newTheatre = await TheatreDAO.createTheatre(name, location);

    res.status(201).json(newTheatre); 
  } catch (error) {
    next(error); 
  }
};

// Controller function to update an existing theatre
export const updateTheatre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; 
    const { name, location } = req.body; 

    const updatedTheatre = await TheatreDAO.updateTheatre(Number(id), name, location);

    if (updatedTheatre) {
      res.status(200).json(updatedTheatre); 
    } else {
      res.status(404).json({ message: 'Theatre not found' });
    }
  } catch (error) {
    next(error); 
  }
};

// Controller function to delete a theatre by ID
export const deleteTheatre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; 
    const deletedTheatre = await TheatreDAO.deleteTheatre(Number(id));

    if (deletedTheatre) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Theatre not found' });
    }
  } catch (error) {
    next(error); 
  }
};