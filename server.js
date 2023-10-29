require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("MongoDB connected");
});

const movieRouter = require("./routes/movie");
const userRouter = require("./routes/user");

const PORT = process.env.PORT;

app.use(express.json());

app.listen(8080, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

const logger = (req, res, next) => {
  console.log(`${req.method} request received on ${req.url}`);
  next();
};

app.use(logger);
app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});
