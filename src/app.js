const express = require("express");

const app = express();

//  Routes
const playerRoutes = require("./routes/player");
const objectRoutes = require("./routes/object");

// parse application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  players
app.use("/api/v1/player", playerRoutes);

//  objects
app.use("/api/v1/object", objectRoutes);

//  Error handler
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

//  Export app to index.js for supertest
module.exports = app;
