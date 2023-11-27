import app from "./app";
import routes from "./routes";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "Welcome to Bookmyshow app, below are the available routes" });
  } catch (err) {
    console.log(err);
  }
});

app.use(routes);
