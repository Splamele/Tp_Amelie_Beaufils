import { Router } from "express";
import {createTask, getAllTask, getTaskById, updateTask, delateTask} from "../controller/taskController";

const router = Router();

router.post('/task', createTask);
router.get('/task', getAllTask);
router.get('/task/:id', getTaskById);
router.put('/task/:id', updateTask);
router.delete('task/:id', delateTask);

export default router;