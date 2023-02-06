import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

app.use("/public", express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
