import express from 'express'
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controllers/taskController.js';
// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask)
  .get(getTaskById);

export default router