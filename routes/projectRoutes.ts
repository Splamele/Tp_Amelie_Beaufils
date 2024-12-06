import { Router } from "express";
import {createProject, getAllProject, getProjectById, updateProject, delateProject, completeProject, getProjectsByStatus} from "../controller/projectController";

const router = Router();

router.post('/project', createProject);
router.get('/project', getAllProject);
router.get('/project/:id', getProjectById);
router.put('/project/:id', updateProject);
router.delete('/project/:id', delateProject);
router.post('/project/:id/complete', completeProject);
router.get('/project/by-status', getProjectsByStatus);

export default router;
