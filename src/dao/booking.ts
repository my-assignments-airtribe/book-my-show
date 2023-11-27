// dao/booking.ts

import db from '../utils/db';

class BookingDAO {
  getBookingsByUser(userId: number) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          Booking.BookingID, 
          Booking.TicketID, 
          Booking.BookingDate, 
          Ticket.SeatNumber, 
          Ticket.Price, 
          Show.ShowDate, 
          Movie.Name AS MovieName, 
          Theatre.Name AS TheatreName 
        FROM 
          Booking 
        JOIN 
          Ticket ON Booking.TicketID = Ticket.TicketID 
        JOIN 
          Show ON Ticket.ShowID = Show.ShowID 
        JOIN 
          Movie ON Show.MovieID = Movie.MovieID 
        JOIN 
          Theatre ON Show.TheatreID = Theatre.TheatreID 
        WHERE 
          Booking.UserID = ?`;
        db.query(query, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // createBooking(userId: number, ticketId: number, bookingDate: string) {
  //   return new Promise((resolve, reject) => {
  //     const query = 'INSERT INTO Booking (UserID, TicketID, BookingDate) VALUES (?, ?, ?)';
  //     db.query(query, [userId, ticketId, bookingDate], (err, results) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve({ BookingID: results.insertId, UserID: userId, TicketID: ticketId, BookingDate: bookingDate });
  //       }
  //     });
  //   });
  // }

  createBooking(userId: number, ticketId: number, bookingDate: string) {
    return new Promise((resolve, reject) => {
      const query = 'CALL BookMultipleTickets(?, ?, ?, ?)';
      db.query(query, [userId, ticketId, ticketId.toString(), bookingDate], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.affectedRows === 0) {
            resolve(null);
          } else {
            resolve({ BookingID: results.insertId, UserID: userId, TicketID: ticketId, BookingDate: bookingDate });
          }
        }
      });
    });
  }

  updateBooking(bookingId: number, userId: number, ticketId: number, bookingDate: string) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Booking SET UserID = ?, TicketID = ?, BookingDate = ? WHERE BookingID = ?';
      db.query(query, [userId, ticketId, bookingDate, bookingId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.affectedRows === 0) {
            resolve(null); 
          } else {
            resolve({ BookingID: bookingId, UserID: userId, TicketID: ticketId, BookingDate: bookingDate });
          }
        }
      });
    });
  }

  deleteBooking(bookingId: number) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Booking WHERE BookingID = ?';
      db.query(query, [bookingId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.affectedRows === 0) {
            resolve(null);
          } else {
            resolve({ message: 'Booking deleted successfully' });
          }
        }
      });
    });
  }
}

export default new BookingDAO();
