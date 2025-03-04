import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import AdminRouter from "./routes/admin.routes";
import EmployeeRouter from "./routes/employee.routes";
import UserRouter from './routes/user.routes';

import fileupload from 'express-fileupload';

const server = express();

dotenv.config();

server.use(express.json());

server.use(cors());

server.use(fileupload({
  createParentPath: true
}));

const PORT = process.env.PORT || 4000;

server.use("/admin", AdminRouter);
server.use("/employee", EmployeeRouter);
server.use("/user", UserRouter);

server.get("/", (req, res) => {
  res.send({message: "Hello World"});
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
