require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Health route (DOIT être en haut)
 */
app.get("/health", (_, res) => {
  res.json({
    status: "ok",
    server: "provider-backend",
  });
});

/**
 * Root route
 */
app.get("/", (_, res) => {
  res.json({
    status: "Backend running",
  });
});

/**
 * Start server (TOUJOURS EN DERNIER)
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});