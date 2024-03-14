import express from "express";
import { authProxy, pastesProxy } from "./proxy";

const app = express();
const port = 3000;

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
