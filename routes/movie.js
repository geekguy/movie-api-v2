const express = require("express");
const router = express.Router();

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

router.get("/", (req, res) => {
  res.send(movies);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const movie = movies.find((movie) => movie.id === parseInt(id, 10));
  res.send(movie);
});

router.post("/", (req, res) => {
  const movie = req.body;
  movie.id = movies.length + 1;
  console.log({ body: req.body });
  movies.push(movie);
  res.send({ success: true });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const movie = req.body;
  movie.id = parseInt(id, 10);
  movies[id - 1] = movie;
  res.send({ success: true });
});

module.exports = router;
