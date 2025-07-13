import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiArrowRight, FiArrowLeft, FiX } from 'react-icons/fi';

const TaskActions = ({ task, onUpdate, onDelete, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority || 'medium',
  });

  const statusOrder = ['pending', 'in-progress', 'completed'];
  const currentIndex = statusOrder.indexOf(task.status);

  const handleStatusChange = (direction) => {
    const newIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < statusOrder.length) {
      onUpdate({
        ...task,
        status: statusOrder[newIndex],
      });
      onClose();
    }
  };

  const handleSave = () => {
    onUpdate({
      ...task,
      ...editData,
    });
    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
      onClose();
    }
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 w-64"
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white font-semibold">Edit Task</h4>
          <button
            onClick={() => setIsEditing(false)}
            className="text-white/50 hover:text-white"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            placeholder="Task title"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            placeholder="Task description"
            rows={3}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          <select
            value={editData.priority}
            onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low" className="bg-gray-800">Low Priority</option>
            <option value="medium" className="bg-gray-800">Medium Priority</option>
            <option value="high" className="bg-gray-800">High Priority</option>
          </select>

          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-2 w-48"
    >
      <div className="space-y-1">
        <button
          onClick={() => setIsEditing(true)}
          className="w-full flex items-center space-x-2 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <FiEdit2 className="w-4 h-4" />
          <span className="text-sm">Edit Task</span>
        </button>

        <button
          onClick={() => handleStatusChange('backward')}
          disabled={currentIndex === 0}
          className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
            currentIndex === 0
              ? 'text-white/30 cursor-not-allowed'
              : 'text-white hover:bg-white/10'
          }`}
        >
          <FiArrowLeft className="w-4 h-4" />
          <span className="text-sm">Move Left</span>
        </button>

        <button
          onClick={() => handleStatusChange('forward')}
          disabled={currentIndex === statusOrder.length - 1}
          className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
            currentIndex === statusOrder.length - 1
              ? 'text-white/30 cursor-not-allowed'
              : 'text-white hover:bg-white/10'
          }`}
        >
          <FiArrowRight className="w-4 h-4" />
          <span className="text-sm">Move Right</span>
        </button>

        <div className="border-t border-white/20 my-1" />

        <button
          onClick={handleDelete}
          className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <FiTrash2 className="w-4 h-4" />
          <span className="text-sm">Delete Task</span>
        </button>
      </div>
    </motion.div>
  );
};

export default TaskActions;
