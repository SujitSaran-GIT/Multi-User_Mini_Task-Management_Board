import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter } from 'react-icons/fi';
import { fetchTasks, createTask } from '../../redux/actions/taskActions';
import TaskColumn from './TaskColumn';
import TaskForm from './TaskForm';
import toast from 'react-hot-toast';

const TaskBoard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await dispatch(fetchTasks());
      } catch (error) {
        toast.error('Failed to load tasks');
      }
    };
    loadTasks();
  }, [dispatch]);

  const columns = [
    {
      id: 'pending',
      title: 'To Do',
      color: 'bg-orange-500',
      tasks: tasks.filter(task => task.status === 'pending'),
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-blue-500',
      tasks: tasks.filter(task => task.status === 'in-progress'),
    },
    {
      id: 'completed',
      title: 'Completed',
      color: 'bg-green-500',
      tasks: tasks.filter(task => task.status === 'completed'),
    },
  ];

  const filteredColumns = filterStatus === 'all' 
    ? columns 
    : columns.filter(col => col.id === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Task Management</h1>
          <p className="text-white/70">
            Organize and track your tasks with our Kanban board
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Filter */}
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all" className="bg-gray-800">All Tasks</option>
              <option value="pending" className="bg-gray-800">To Do</option>
              <option value="in-progress" className="bg-gray-800">In Progress</option>
              <option value="completed" className="bg-gray-800">Completed</option>
            </select>
          </div>

          {/* Add Task Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTaskForm(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Task</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Task Board */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredColumns.map((column) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TaskColumn
                column={column}
                onTaskUpdate={(taskId, newStatus) => {
                  // Handle task status update
                  console.log('Task updated:', taskId, newStatus);
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Task Form Modal */}
      <AnimatePresence>
        {showTaskForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowTaskForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-md"
            >
              <TaskForm
                onClose={() => setShowTaskForm(false)}
                onSubmit={async (taskData) => {
                  try {
                    // Add username to the task data
                    const taskWithUser = {
                      ...taskData,
                      username: user?.name || user?.email || 'default-user'
                    };
                    
                    await dispatch(createTask(taskWithUser));
                    toast.success('Task created successfully!');
                    setShowTaskForm(false);
                  } catch (error) {
                    toast.error('Failed to create task');
                  }
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskBoard;