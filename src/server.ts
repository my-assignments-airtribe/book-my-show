import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// })

// db.query('SELECT * FROM User', (error, results) => {
//   if (error) {
//     return res.status(500).send('Database query failed');
//   }

//   res.json(results);
// });

// when user goes to /, show avaialble routes and methods in the browser
// a. Select Theatre and Display Dates
// Endpoint: /theatres
// Method: GET
// Response: List of theatres in the city.
// Database Table: Theatre
// Fields: TheatreID, Name, Location
// b. Display Movies on Selected Date and Theatre
// Endpoint: /theatres/{theatreId}/movies
// Method: GET
// Parameters: date (query parameter)
// Response: List of movies playing in the selected theatre on the given date with showtimes.
// Database Table(s): Movie, Show
// Fields: For Movie - MovieID, Name, etc. For Show - ShowID, ShowDate, ShowTime, etc.
// c. Book Seats for a Show
// Endpoint: /bookings
// Method: POST
// Request Body: Contains UserID, TheatreID, ShowID, SeatNumbers (array of seat numbers)
// Response: Booking confirmation.
// Database Table(s): Booking, Ticket
// Fields: For Booking - BookingID, UserID, TicketID, BookingDate, etc.

// d. View Bookings
// Endpoint: /bookings
// Method: GET
// Parameters: userId (query parameter)
// Response: List of bookings for the given user.
// Database Table(s): Booking, Ticket
// Fields: For Booking - BookingID, UserID, TicketID, BookingDate, etc. For Ticket - TicketID, ShowID, SeatNumber, etc.

app.get("/", async (req, res) => {
  const availableRoutes = [
    {
      route: "/theatres",
      method: "GET",
      description: "Select Theatre and Display Dates",
      queryParameters: [],
      request: "",
      response: "List of theatres in the city",
      databaseTable: "Theatre",
      fields: "TheatreID, Name, Location",
    },
    {
      route: "/theatres/{theatreId}/movies",
      method: "GET",
      description: "Display Movies on Selected Date and Theatre",
      queryParameters: ["date"],
      request: "",
      response:
        "List of movies playing in the selected theatre on the given date with showtimes",
      databaseTable: "Movie, Show",
      fields:
        "For Movie - MovieID, Name, etc. For Show - ShowID, ShowDate, ShowTime, etc.",
    },
    {
      route: "/bookings",
      method: "POST",
      description: "Book Seats for a Show",
      queryParameters: [],
      request:
        "Contains UserID, TheatreID, ShowID, SeatNumbers (array of seat numbers)",
      response: "Booking confirmation",
      databaseTable: "Booking, Ticket",
      fields:
        "For Booking - BookingID, UserID, TicketID, BookingDate, etc. For Ticket - TicketID, ShowID, SeatNumber, etc.",
    },
    {
      route: "/bookings",
      method: "GET",
      description: "View Bookings",
      queryParameters: ["userId"],
      request: "",
      response: "List of bookings for the given user",
      databaseTable: "Booking, Ticket",
      fields:
        "For Booking - BookingID, UserID, TicketID, BookingDate, etc. For Ticket - TicketID, ShowID, SeatNumber, etc.",
    },
  ];
  try {
    res.status(200).json({ message: "Welcome to Bookmyshow app, below are the available routes", availableRoutes });
  } catch (err) {
    console.log(err);
  }
});
