import app from './app';
import db from './utils/db'

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// })

app.get('/', (req, res) => {
  db.query('SELECT * FROM User', (error, results) => {
    if (error) {
      return res.status(500).send('Database query failed');
    }

    res.json(results);
  });
});
