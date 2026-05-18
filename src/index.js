require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_, res) => {

  res.json({
    status: "Backend running",
  });
});

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});

app.get("/health", (_, res) => {

  res.json({
    status: "ok",
    server: "provider-backend",
  });
});