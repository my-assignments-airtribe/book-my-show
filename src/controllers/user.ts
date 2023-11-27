import { Request, Response, NextFunction } from 'express';
import UserDAO from '../dao/user';

// Controller function to get all users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserDAO.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Controller function to get a user by ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await UserDAO.getUserById(parseInt(id, 10));

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Controller function to create a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Name, Email, Phone, Password } = req.body;
    const newUser = await UserDAO.createUser(Name, Email, Phone, Password);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// Controller function to update a user by ID
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { Name, Email, Phone, Password } = req.body;
    const updatedUser = await UserDAO.updateUser(parseInt(id, 10), Name, Email, Phone, Password);

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Controller function to delete a user by ID
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserDAO.deleteUser(parseInt(id, 10));

    if (deletedUser) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};
