import { Request, Response, NextFunction } from 'express';
import MovieDAO from "../dao/movie";

// Controller function to get a list of all movies
export const getMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies = await MovieDAO.getAllMovies();
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

// Controller function to get a movie by its ID
export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const movie = await MovieDAO.getMovieById(parseInt(id, 10));

    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Controller function to create a new movie
export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, language, genre, rating, duration, releaseDate } = req.body;
    const newMovie = await MovieDAO.createMovie(name, language, genre, rating, duration, releaseDate);
    res.status(201).json(newMovie);
  } catch (error) {
    next(error);
  }
};

// Controller function to update a movie by its ID
export const updateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, language, genre, rating, duration, releaseDate } = req.body;
    const updatedMovie = await MovieDAO.updateMovie(parseInt(id, 10), name, language, genre, rating, duration, releaseDate);

    if (updatedMovie) {
      res.status(200).json(updatedMovie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Controller function to delete a movie by its ID
export const deleteMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedMovie = await MovieDAO.deleteMovie(parseInt(id, 10));

    if (deletedMovie) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    next(error);
  }
};
