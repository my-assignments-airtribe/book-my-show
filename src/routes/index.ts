import express from 'express';

// Import route handlers or controllers for each entity
import { 
  getTheatres, 
  getTheatresByCity, 
  createTheatre, 
  updateTheatre, 
  deleteTheatre 
} from '../controllers/theatre';

import { 
  getMovies, 
  getMovieById, 
  createMovie, 
  updateMovie, 
  deleteMovie 
} from '../controllers/movie';

import { 
  getShowsByTheatreAndDate, 
  createShow, 
  updateShow, 
  deleteShow 
} from '../controllers/show';

import { 
  getTicketsByShow, 
  createTicket, 
  updateTicket, 
  deleteTicket 
} from '../controllers/ticket';

import { 
  getUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} from '../controllers/user';

import { 
  getBookingsByUser, 
  createBooking, 
  updateBooking, 
  deleteBooking 
} from '../controllers/booking';

const router = express.Router();

// Routes for Theatres
router.get('/theatres', getTheatres);
router.get('/theatres/:city', getTheatresByCity);
router.post('/theatres', createTheatre);
router.put('/theatres/:id', updateTheatre);
router.delete('/theatres/:id', deleteTheatre);

// Routes for Movies
router.get('/movies', getMovies);
router.get('/movies/:id', getMovieById);
router.post('/movies', createMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

// Routes for Shows
// @ts-ignore
router.get('/shows/:theatreId/:date', getShowsByTheatreAndDate);
router.post('/shows', createShow);
router.put('/shows/:id', updateShow);
router.delete('/shows/:id', deleteShow);

// Routes for Tickets
router.get('/tickets/:showId', getTicketsByShow);
router.post('/tickets', createTicket);
router.put('/tickets/:id', updateTicket);
router.delete('/tickets/:id', deleteTicket);

// Routes for Users
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Routes for Bookings
// @ts-ignore
router.get('/bookings/:userId', getBookingsByUser);
router.post('/bookings', createBooking);
router.put('/bookings/:id', updateBooking);
router.delete('/bookings/:id', deleteBooking);

export default router;
