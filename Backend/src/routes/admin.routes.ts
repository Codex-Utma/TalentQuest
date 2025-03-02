import { Router } from "express";
import { createClass, createCourse, createModule, getStats, login } from "../controllers/adminController";
import authMiddleware from "../utils/helpers/authMiddleware";

const router = Router();

router.post("/login", (req, res) => {
  login(req, res);
});

router.get("/users-stats", authMiddleware('admin'), (req, res) => {
  getStats(req, res);
});

router.post("/course", authMiddleware('admin'), (req, res) => {
  createCourse(req, res);
});

router.post("/module/:courseId", authMiddleware('admin'), (req, res) => {
  createModule(req, res);
});

router.post("/class/:moduleId", authMiddleware('admin'), (req, res) => {
  createClass(req, res);
});

export default router;
