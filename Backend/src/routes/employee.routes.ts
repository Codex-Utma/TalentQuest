import { Router } from "express";

import { getCourseDetails, login } from "../controllers/employeeController";

import authMiddleware from "../utils/helpers/authMiddleware";

const router = Router();

router.post("/login", (req, res) => {
  login(req, res);
});

router.get("/course-details", authMiddleware('employee'), (req, res) => {
  getCourseDetails(req, res);
});

export default router;
