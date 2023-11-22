import express, { Request, Response } from 'express';
const router = express.Router();

// Define routes here or import them

router.get("/theatres", async (req:Request, res:Response) => {
  try {
    // get the list of theatres
  }
  catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/theatres/:theatreId/movies", async (req:Request, res:Response) => {
  try {
    // get the list of movies
  }
  catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/theatres/:theatreId/movies/:movieId/shows", async (req:Request, res:Response) => {
  try {
    // get the list of shows
  }
  catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/bookings", async (req:Request, res:Response) => {
  try {
    // book the tickets
  }
  catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/bookings", async (req:Request, res:Response) => {
  try {
    // get the list of bookings
  }
  catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/bookings/:bookingId", async (req:Request, res:Response) => {
  try {
    // get the booking details
  }
  catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});


export default router;