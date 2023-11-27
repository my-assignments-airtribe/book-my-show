import db from "../utils/db";

class TheatreDAO {
  getAllTheatres() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM Theatre", (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
  getTheatresByCity(city: string) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM Theatre WHERE Location = ?",
        [city],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  createTheatre(name: string, location: string) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Theatre (Name, Location) VALUES (?, ?)';
      db.query(query, [name, location], (err, results) => {
        if (err) {
          reject(err);
        } else {
          const newTheatreId = results.insertId;
          resolve({ TheatreID: newTheatreId, name, location });
        }
      });
    });
  }

  updateTheatre(id: number, name: string, location: string) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Theatre SET Name = ?, Location = ? WHERE TheatreID = ?';
      db.query(query, [name, location, id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          const updatedTheatreId = results.insertId;
          resolve({ TheatreID: updatedTheatreId, name, location });
        }
      });
    });
  }

  deleteTheatre(id: number) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Theatre WHERE TheatreID = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

export default new TheatreDAO();
