import express from "express";
import { authProxy } from "./proxy";

const app = express();
const port = 3000;

app.use(authProxy);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
