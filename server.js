require("dotenv").config();

const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api.routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: process.env.NODE_ENV === "production" ? null : err.message
  });
});

app.listen(port, '0.0.0.0', () => { // Listen on all network interfaces
  console.log(`Server running on port ${port}`);
});