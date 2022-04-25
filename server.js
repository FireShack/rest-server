require("dotenv").config(); // For our .env file
const express = require("express");
const cors = require("cors");
const user = require("./routes/user.js");
const auth = require("./routes/auth.js");
const { dbConnection } = require("./database/config.js");

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(express.static("public"));
app.use(cors());
app.use(express.json()); // Parse JSON petitions
// DB connection
dbConnection();

// Main route
app.use("/api/users", user);
app.use("/api/auth", auth);

app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);
