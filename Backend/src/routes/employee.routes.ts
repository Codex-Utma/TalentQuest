import { Router } from "express";
import { Login } from "../controllers/employeeController";

const router = Router();

router.post("/login", (req, res) => {
  Login(req, res);
});

export default router;
