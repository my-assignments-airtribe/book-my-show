import { Request, Response, NextFunction } from 'express';
import TicketDAO from "../dao/ticket";

// Controller function to get tickets by show ID
export const getTicketsByShow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { showId } = req.params;
    const tickets = await TicketDAO.getTicketsByShow(parseInt(showId, 10));

    if (tickets) {
      res.status(200).json(tickets);
    } else {
      res.status(404).json({ message: 'No tickets found for the provided show ID' });
    }
  } catch (error) {
    next(error);
  }
};

// Controller function to create a new ticket
export const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { showID, theatreID, seatNumber, price, seatsAllotted } = req.body;
    const newTicket = await TicketDAO.createTicket(showID, theatreID, seatNumber, price, seatsAllotted);
    res.status(201).json(newTicket);
  } catch (error) {
    next(error);
  }
};

// Controller function to update a ticket by its ID
export const updateTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { showID, theatreID, seatNumber, price, seatsAllotted } = req.body;
    const updatedTicket = await TicketDAO.updateTicket(parseInt(id, 10), showID, theatreID, seatNumber, price, seatsAllotted);

    if (updatedTicket) {
      res.status(200).json(updatedTicket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Controller function to delete a ticket by its ID
export const deleteTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedTicket = await TicketDAO.deleteTicket(parseInt(id, 10));

    if (deletedTicket) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    next(error);
  }
};
