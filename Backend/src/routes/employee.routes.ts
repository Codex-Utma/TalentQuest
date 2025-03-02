import { Router } from "express";

import { addClassCompleted, getClasses, getCourseDetails, getModules, getResponse, login } from "../controllers/employeeController";

import authMiddleware from "../utils/helpers/authMiddleware";

const router = Router();

router.post("/login", (req, res) => {
  login(req, res);
});

router.get("/course-details", authMiddleware('employee'), (req, res) => {
  getCourseDetails(req, res);
});

router.get("/modules", authMiddleware('employee'), (req, res) => {
  getModules(req, res);
});

router.get("/classes/:moduleId", authMiddleware('employee'), (req, res) => {
  getClasses(req, res);
});

router.post("/class-completed/:classId", authMiddleware('employee'), (req, res) => {
  addClassCompleted(req, res);
});

router.get("/ia-question/:moduleId/:classId", authMiddleware('employee'), (req, res) => {
  getResponse(req, res);
});

export default router;
