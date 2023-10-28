const express = require("express");
const app = express();

app.listen(8080, () => {
  console.log(`Server is up and running on port 8080`);
});

app.get("/", (req, res) => {
  console.log(`request received on /`);
  res.send("Hello world");
});
