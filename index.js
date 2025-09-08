const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();


import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
const leadInfoRouter = require("./src/routers/leadRouter");
const UserRouter = require("./src/routers/userRouter");

// Serve ebook manually
app.get("/e-book", (req, res) => {
  res.sendFile(path.join(__dirname, "e-book.pdf")); // adjust path if inside /public
});

// Database connection
const dbConnect = require("./src/config/MongoDB");

//Check Health
app.get("/", (req, res) => {
  res.send("Hello marketers, Funnel BE is running");
});


app.use("/api/leads", leadInfoRouter);
app.use('/api/users', UserRouter);

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
