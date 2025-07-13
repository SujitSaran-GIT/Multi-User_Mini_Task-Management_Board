import TaskModel from '../models/TaskModel.js'


export const createTask = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const task = new TaskModel({ title, description, userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(400).json({ error: err.message });
  }
};


export const getTasks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.userId) {
      filter.userId = req.query.userId;
    }
    const tasks = await TaskModel.find(filter);
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: err.message });
  }
};


export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).json({ error: err.message });
  }
};


export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(400).json({ error: err.message });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TaskModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: err.message });
  }
};
