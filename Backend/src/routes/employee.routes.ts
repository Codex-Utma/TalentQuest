import { Router } from "express";

import { getClasses, getCourseDetails, getModules, login } from "../controllers/employeeController";

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

export default router;
