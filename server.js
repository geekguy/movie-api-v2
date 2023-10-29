require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;

console.log({ PORT });

const movies = [
  {
    id: 1,
    name: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    duration: "2h 22min",
    genre: ["Crime", "Drama"],
    rate: 9.3,
  },
  {
    id: 2,
    name: "The Godfather",
    year: 1972,
    director: "Francis Ford Coppola",
    duration: "2h 55min",
    genre: ["Crime", "Drama"],
    rate: 9.2,
  },
];

app.use(express.json());

app.listen(8080, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

const logger = (req, res, next) => {
  console.log(`${req.method} request received on ${req.url}`);
  next();
};

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/movies", (req, res) => {
  res.send(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = movies.find((movie) => movie.id === parseInt(id, 10));
  res.send(movie);
});

app.post("/api/movies", (req, res) => {
  const movie = req.body;
  movie.id = movies.length + 1;
  console.log({ body: req.body });
  movies.push(movie);
  res.send({ success: true });
});

app.put("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = req.body;
  movie.id = parseInt(id, 10);
  movies[id - 1] = movie;
  res.send({ success: true });
});
