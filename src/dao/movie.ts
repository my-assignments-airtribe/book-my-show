import db from '../utils/db';

class MovieDAO {
  // Function to get a list of all movies
  getAllMovies() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Movie';
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Function to get a movie by its ID
  getMovieById(id: number) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Movie WHERE MovieID = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve(null); // No movie found with the provided ID
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  }

  // Function to create a new movie
  createMovie(name: string, language: string, genre: string, rating: string, duration: string, releaseDate: string) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Movie (Name, Language, Genre, Rating, Duration, ReleaseDate) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(query, [name, language, genre, rating, duration, releaseDate], (err, results) => {
        if (err) {
          reject(err);
        } else {
          const newMovieId = results.insertId;
          resolve({ MovieID: newMovieId, name, language, genre, rating, duration, releaseDate });
        }
      });
    });
  }

  // Function to update a movie by its ID
  updateMovie(movieID: number, name: string, language: string, genre: string, rating: string, duration: string, releaseDate: string) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Movie SET Name = ?, Language = ?, Genre = ?, Rating = ?, Duration = ?, ReleaseDate = ? WHERE MovieID = ?';
      db.query(query, [name, language, genre, rating, duration, releaseDate, movieID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.affectedRows === 0) {
            resolve(null); // No movie found with the provided ID
          } else {
            resolve({ movieID, name, language, genre, rating, duration, releaseDate });
          }
        }
      });
    });
  }

  // Function to delete a movie by its ID
  deleteMovie(movieID: number) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Movie WHERE MovieID = ?';
      db.query(query, [movieID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.affectedRows === 0) {
            resolve(null); // No movie found with the provided ID
          } else {
            resolve({ message: 'Movie deleted successfully' });
          }
        }
      });
    });
  }
}

export default new MovieDAO();
