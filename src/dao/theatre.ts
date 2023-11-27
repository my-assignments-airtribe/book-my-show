import db from "../utils/db";

import { client, theatreCachePrefix } from "../cache";

const redisKey = "allTheatres";
class TheatreDAO {
  async getAllTheatres() {
    try {
      const cachedTheatres = await client.get(redisKey);
      if (cachedTheatres) {
        return JSON.parse(cachedTheatres);
      } else {
        const theatres = await this.fetchTheatresFromDB();
        await client.setEx(redisKey, 3600, JSON.stringify(theatres));
        return theatres;
      }
    } catch (err) {
      console.error(err);
      return this.fetchTheatresFromDB();
    }
  }

  private async fetchTheatresFromDB(): Promise<any[]> {
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

  async getTheatreById(id: number) {
    try {
      const cachedTheatre = await client.get(`${theatreCachePrefix}${id}`);
      if (cachedTheatre) {
        return JSON.parse(cachedTheatre);
      } else {
        const theatre = await this.fetchTheatreByIdFromDB(id);
        if (theatre) {
          await client
            .setEx(`${theatreCachePrefix}${id}`, 3600, JSON.stringify(theatre))
            .catch((e) => console.error("Redis setEx error:", e));
        }
        return theatre;
      }
    } catch (err) {
      console.error(err);
      return this.fetchTheatreByIdFromDB(id);
    }
  }

  private async fetchTheatreByIdFromDB(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM Theatre WHERE TheatreID = ?",
        [id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            if (results.length === 0) {
              resolve(null); // No theatre found with the provided ID
            } else {
              resolve(results[0]);
            }
          }
        }
      );
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
  async createTheatre(name: string, location: string) {
    try {
      // Perform the database insertion as usual
      const query = "INSERT INTO Theatre (Name, Location) VALUES (?, ?)";
      const result = await new Promise((resolve, reject) => {
        db.query(query, [name, location], (err, results) => {
          if (err) {
            reject(err);
          } else {
            const newTheatreId = results.insertId;
            resolve({ TheatreID: newTheatreId, name, location });
          }
        });
      });

      // Remove the cached data for "allTheatres" because it's now outdated
      await client.del(redisKey);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateTheatre(id: number, name: string, location: string) {
    try {
      // Perform the database update as usual
      const query =
        "UPDATE Theatre SET Name = ?, Location = ? WHERE TheatreID = ?";
      const result = await new Promise((resolve, reject) => {
        db.query(query, [name, location, id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            const updatedTheatreId = results.insertId;
            resolve({ TheatreID: updatedTheatreId, name, location });
          }
        });
      });

      await client.del(redisKey);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteTheatre(id: number) {
    try {
      // Perform the database deletion as usual
      const query = "DELETE FROM Theatre WHERE TheatreID = ?";
      const result = await new Promise((resolve, reject) => {
        db.query(query, [id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      await client.del("allTheatres");

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new TheatreDAO();
