import { Router } from "express";
import { login } from "../controllers/adminController";

const router = Router();

router.post("/login", (req, res) => {
  login(req, res);
});

export default router;
