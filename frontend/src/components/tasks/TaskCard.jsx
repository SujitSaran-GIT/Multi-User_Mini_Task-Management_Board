import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiMoreVertical, FiCalendar, FiUser } from 'react-icons/fi';
import TaskActions from './TaskActions';
import { AnimatePresence } from 'framer-motion';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 cursor-pointer relative group"
    >
      {/* Task Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
          {task.priority && (
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowActions(!showActions);
          }}
          className="text-white/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
        >
          <FiMoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Task Content */}
      <div className="space-y-3">
        <h4 className="text-white font-semibold text-sm leading-tight">
          {task.title}
        </h4>
        
        {task.description && (
          <p className="text-white/70 text-xs line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Task Meta */}
        <div className="flex items-center justify-between text-xs text-white/50">
          <div className="flex items-center space-x-2">
            <FiCalendar className="w-3 h-3" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
          {task.assignee && (
            <div className="flex items-center space-x-1">
              <FiUser className="w-3 h-3" />
              <span>{task.assignee}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {task.tags.length > 2 && (
              <span className="text-white/50 text-xs">+{task.tags.length - 2}</span>
            )}
          </div>
        )}
      </div>

      {/* Actions Menu */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-12 right-0 z-10"
          >
            <TaskActions
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onClose={() => setShowActions(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskCard;