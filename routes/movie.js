const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

// router.get("/:id", (req, res) => {
//   const id = req.params.id;
//   const movie = movies.find((movie) => movie.id === parseInt(id, 10));
//   res.send(movie);
// });

router.post("/", async (req, res) => {
  const movie = req.body;
  const dbMovie = await Movie.create(movie);
  res.send(dbMovie);
});

// router.put("/:id", (req, res) => {
//   const id = req.params.id;
//   const movie = req.body;
//   movie.id = parseInt(id, 10);
//   movies[id - 1] = movie;
//   res.send({ success: true });
// });

module.exports = router;
