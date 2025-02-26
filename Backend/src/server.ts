import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const server = express();

dotenv.config();

server.use(express.json());

server.use(cors());

const PORT = process.env.PORT || 4000;

server.get("/", (req, res) => {
  res.send({message: "Hello World"});
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
