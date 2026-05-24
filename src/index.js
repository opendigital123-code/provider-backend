require("dotenv").config();

const express = require("express");
const cors = require("cors");

const providerRoutes =
  require("./routes/providerRoutes");
const userRoutes =
  require("./routes/userRoutes");
const notificationRoutes =
  require("./routes/notificationRoutes");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/errorHandler");

const app = express();

const corsOrigin =
  process.env.CORS_ORIGIN || "*";

app.use(
  cors({
    origin: corsOrigin,
  })
);
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
    server: "provider-backend",
    project: "glamgo",
  });
});

app.get("/", (_, res) => {
  res.json({
    status: "Backend running",
    endpoints: [
      "POST /provider/location",
      "GET /provider/nearby?lat=&lng=&radiusKm=&category=",
      "PUT /users/:userId/push-token",
      "PUT /users/:userId/categories",
      "POST /notifications/booking",
      "POST /notifications/message",
      "GET /health",
    ],
  });
});

app.use("/provider", providerRoutes);
app.use("/users", userRoutes);
app.use("/notifications", notificationRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    "GlamGo provider backend running on port",
    PORT
  );
});
