const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Movie = require("../models/movie");

const jwtVerify = (req, res, next) => {
  const headers = req.headers;
  const authToken = headers.authorization;
  if (authToken) {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    console.log({ decodedToken });
    req.user = decodedToken;
  }
  next();
};

router.use(jwtVerify);

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  res.send(movie);
});

router.post("/", async (req, res) => {
  const movie = req.body;
  const user = req.user;
  if (user && user.role === "ADMIN") {
    const dbMovie = await Movie.create(movie);
    res.send(dbMovie);
  } else {
    res.status(403).send({ message: "Only admins can create new movies" });
  }
});

// router.put("/:id", (req, res) => {
//   const id = req.params.id;
//   const movie = req.body;
//   movie.id = parseInt(id, 10);
//   movies[id - 1] = movie;
//   res.send({ success: true });
// });

module.exports = router;
