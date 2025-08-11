const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// Routes
const leadInfoRouter = require("./src/routers/leadRouter");

// Database connection
const dbConnect = require("./src/config/MongoDB");
const { Lead } = require("./src/models/leadModel");

//Check Health
app.get("/", (req, res) => {
  res.send("Hello marketers, Funnel BE is running");
});

app.use("/api/leads", leadInfoRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "ERROR",
    message: err.message || "Internal Server Error",
  });
});

dbConnect()
  .then(() => {
    app.listen(PORT, (error) =>
      error
        ? console.log(error)
        : console.log(`Server is running at http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.log(`DB connection error `, error);
  });
