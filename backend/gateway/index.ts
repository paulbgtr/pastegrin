import express from "express";
import { authProxy, pastesProxy } from "./proxy";
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use((req, res, next) => {
  if (req.cookies.token)
    req.headers.authorization = `Bearer ${req.cookies.token}`;

  next();
});

app.use(authProxy);
app.use(pastesProxy);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the pastegrin API",
    endpoints: {
      "/auth": "Authentication service",
      "/pastes": "Pastes service",
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
