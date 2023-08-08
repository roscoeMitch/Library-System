require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

// database connection
connectDB();

// middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4500;

app.use(express.static("public"));

// Default route
app.use("/", require("./routes/root"));

// Routes
app.use("/tickets", require("./routes/ticketRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/auctions", require("./routes/auctionRoutes"));

// Error catching if user navigates to unknown route
app.all("*", (req, res) => {
  res.status(400);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

// Initialise the server and make connection to the database
mongoose.connection.once("open", () => {
  console.log("Successfull connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
});

module.exports = app;
