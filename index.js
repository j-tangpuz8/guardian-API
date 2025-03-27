const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const incidentsRoutes = require("./routes/incidentsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const cors = require("cors");

require("dotenv").config();

const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

// db connection
connectDB();

// routes
app.use("/incidents", incidentsRoutes);
app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
