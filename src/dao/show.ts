import db from "../utils/db";

class ShowDAO {
  getShowsByTheatreAndDate(theatreId: number, date: string) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          Movie.Name as movieName, 
          Movie.Language, 
          Movie.Genre, 
          Movie.Rating, 
          Movie.Duration, 
          Show.ShowTime 
        FROM 
          Show 
        JOIN 
          Movie ON Show.MovieID = Movie.MovieID 
        WHERE 
          Show.TheatreID = ? AND Show.ShowDate = ?`;
      db.query(query, [theatreId, date], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
  // Function to create a new show
  createShow(
    theatreID: number,
    movieID: number,
    showDate: string,
    showTime: string
  ) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO Show (TheatreID, MovieID, ShowDate, ShowTime) VALUES (?, ?, ?, ?)";
      db.query(
        query,
        [theatreID, movieID, showDate, showTime],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            const newShowId = results.insertId;
            resolve({
              ShowID: newShowId,
              theatreID,
              movieID,
              showDate,
              showTime,
            });
          }
        }
      );
    });
  }

  // Function to update a show by its ID
  updateShow(
    showID: number,
    theatreID: number,
    movieID: number,
    showDate: string,
    showTime: string
  ) {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE Show SET TheatreID = ?, MovieID = ?, ShowDate = ?, ShowTime = ? WHERE ShowID = ?";
      db.query(
        query,
        [theatreID, movieID, showDate, showTime, showID],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            if (results.affectedRows === 0) {
              resolve(null); // No show found with the provided ID
            } else {
              resolve({ showID, theatreID, movieID, showDate, showTime });
            }
          }
        }
      );
    });
  }

  // Function to delete a show by its ID
  deleteShow(ShowID: number) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM Show WHERE ShowID = ?";
      db.query(query, [ShowID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.affectedRows === 0) {
            resolve(null); // No show found with the provided ID
          } else {
            resolve({ message: "Show deleted successfully" });
          }
        }
      });
    });
  }
}

export default new ShowDAO();
