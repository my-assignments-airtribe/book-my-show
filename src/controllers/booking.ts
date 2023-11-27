// controllers/booking.ts

import { NextFunction, Response, Request } from "express";
import BookingDAO from "../dao/booking";
import { BookingRequestProps } from "../types/booking";

export const getBookingsByUser = async (
  req: BookingRequestProps,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  try {
    const bookings = await BookingDAO.getBookingsByUser(userId);
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
}

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, ticketId, bookingDate } = req.body;
  try {
    const booking = await BookingDAO.createBooking(userId, ticketId, bookingDate);
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
}

export const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookingId } = req.params;
  const { userId, ticketId, bookingDate } = req.body;
  try {
    const updatedBooking = await BookingDAO.updateBooking(Number(bookingId), userId, ticketId, bookingDate);
    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    next(error);
  }
}

export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookingId } = req.params;
  try {
    const result = await BookingDAO.deleteBooking(Number(bookingId));
    if (result) {
      res.status(200).json({ message: 'Booking deleted successfully' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    next(error);
  }
}
