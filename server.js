require("dotenv").config(); // For our .env file
const express = require("express");
const cors = require("cors");
const router = require("./routes/user.js");

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON petitions

// Main route
app.use("/api/users", router);

app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);
