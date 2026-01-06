require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const noteRouter = require('./routes/noteRoutes')
const userRouter = require('./routes/userRoute')

// MIDDLEWARE
app.use(express.json()); // It looks if it has a some (body) to request to the server if it does it parses data to json format so we can  access that through req handler. 


app.use((req, res, next) => {
  console.log("HIT:", req.method, req.url);
  next();
});
 
// DB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

// ROUTES

app.use("/api/notes", noteRouter);
app.use("/api/user", userRouter);

// Health check
app.get("/ping", (req, res) => {
  res.send("Server is alive");
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// SERVER
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});