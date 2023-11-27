import db from '../utils/db';

class TicketDAO {
  // Function to get tickets by show ID
  getTicketsByShow(showId: number) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Ticket WHERE ShowID = ?';
      db.query(query, [showId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve(null); // No tickets found for the provided show ID
          } else {
            resolve(results);
          }
        }
      });
    });
  }

  // Function to create a new ticket
  createTicket(showID: number, theatreID: number, seatNumber: string, price: number, seatsAllotted: string) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Ticket (ShowID, TheatreID, SeatNumber, Price, SeatsAllotted) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [showID, theatreID, seatNumber, price, seatsAllotted], (err, results) => {
        if (err) {
          reject(err);
        } else {
          const newTicketId = results.insertId;
          resolve({ TicketID: newTicketId, showID, theatreID, seatNumber, price, seatsAllotted });
        }
      });
    });
  }

  // Function to update a ticket by its ID
  updateTicket(ticketID: number, showID: number, theatreID: number, seatNumber: string, price: number, seatsAllotted: string) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Ticket SET ShowID = ?, TheatreID = ?, SeatNumber = ?, Price = ?, SeatsAllotted = ? WHERE TicketID = ?';
      db.query(query, [showID, theatreID, seatNumber, price, seatsAllotted, ticketID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.affectedRows === 0) {
            resolve(null); // No ticket found with the provided ID
          } else {
            resolve({ ticketID, showID, theatreID, seatNumber, price, seatsAllotted });
          }
        }
      });
    });
  }

  // Function to delete a ticket by its ID
  deleteTicket(ticketID: number) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Ticket WHERE TicketID = ?';
      db.query(query, [ticketID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.affectedRows === 0) {
            resolve(null); // No ticket found with the provided ID
          } else {
            resolve({ message: 'Ticket deleted successfully' });
          }
        }
      });
    });
  }
}

export default new TicketDAO();
