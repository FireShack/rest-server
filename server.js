require("dotenv").config(); // For our .env file
const express = require("express");
const cors = require("cors");
const user = require("./routes/user.js");
const auth = require("./routes/auth.js");
const { dbConnection } = require("./database/config.js");
const categories = require("./routes/categories.js");
const products = require("./routes/products.js");
const search = require("./routes/search.js");

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
app.use("/api/market", categories);
app.use("/api/market", products);
app.use("/api/search", search);

app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);
