import { Router } from "express";
import { getStats, login } from "../controllers/adminController";
import authMiddleware from "../utils/helpers/authMiddleware";

const router = Router();

router.post("/login", (req, res) => {
  login(req, res);
});

router.get("/users-stats", authMiddleware('admin'), (req, res) => {
  getStats(req, res);
});

export default router;
