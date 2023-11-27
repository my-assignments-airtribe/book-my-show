import db from '../utils/db';
import bcrypt from 'bcrypt';

class UserDAO {
  // Function to get all users
  getUsers() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT UserID, Name, Email, Phone FROM User';
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Function to get a user by ID
  getUserById(userId: number) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM User WHERE UserID = ?';
      db.query(query, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve(null); // No user found with the provided ID
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  }

  // Function to create a new user
  createUser(name: string, email: string, phone: string, password: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO User (Name, Email, Phone, Password) VALUES (?, ?, ?, ?)';
        db.query(query, [name, email, phone, hashedPassword], (err, results) => {
          if (err) {
            reject(err);
          } else {
            const newUserId = results.insertId;
            resolve({ UserID: newUserId, name, email, phone });
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  // Function to update a user by ID
  updateUser(UserID: number, Name: string, Email: string, Phone: string, Password: string) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE User SET Name = ?, Email = ?, Phone = ?, Password = ? WHERE UserID = ?';
      db.query(query, [Name, Email, Phone, Password, UserID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.affectedRows === 0) {
            resolve(null); // No user found with the provided ID
          } else {
            resolve({ UserID, Name, Email, Phone });
          }
        }
      });
    });
  }

  // Function to delete a user by ID
  deleteUser(UserID: number) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM User WHERE UserID = ?';
      db.query(query, [UserID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.affectedRows === 0) {
            resolve(null); // No user found with the provided ID
          } else {
            resolve({ message: 'User deleted successfully' });
          }
        }
      });
    });
  }
}

export default new UserDAO();
