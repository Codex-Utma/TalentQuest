import { Router } from "express";

import { addClassCompleted, getClasses, getCourseDetails, getModules, getResource, getResponse, getVideo } from "../controllers/employeeController";

import authMiddleware from "../utils/helpers/authMiddleware";

const router = Router();

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

router.get("/get-resource/:classId", authMiddleware('employee'), (req, res) => {
  getResource(req, res);
});

router.get("/get-video/:classId", authMiddleware('employee'), (req, res) => {
  getVideo(req, res);
});

export default router;
