import { Router } from "express";
import { createClass, createCourse, createModule, getClasses, getCourses, getGeneralStats, getModules, getUsersStats, register } from "../controllers/adminController";
import authMiddleware from "../utils/helpers/authMiddleware";

const router = Router();

router.get('/general-stats', authMiddleware('admin'), (req, res) => {
  getGeneralStats(req, res);
});

router.get("/users-stats", authMiddleware('admin'), (req, res) => {
  getUsersStats(req, res);
});

router.get("/courses", authMiddleware('admin'), (req, res) => {
  getCourses(req, res);
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

router.post("/register", authMiddleware('admin'), (req, res) => {
  register(req, res);
});

router.get("/modules/:courseId", authMiddleware('admin'), (req, res) => {
  getModules(req, res);
});

router.get("/classes/:moduleId", authMiddleware('admin'), (req, res) => {
  getClasses(req, res);
});

export default router;
