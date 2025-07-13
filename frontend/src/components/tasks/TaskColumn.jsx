import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import TaskCard from './TaskCard';

const TaskColumn = ({ column, onTaskUpdate }) => {
  const { id, title, color, tasks } = column;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 min-h-[600px]"
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${color}`} />
          <h3 className="text-white font-semibold">{title}</h3>
          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button className="text-white/50 hover:text-white transition-colors">
          <FiPlus className="w-4 h-4" />
        </button>
      </div>

      {/* Tasks */}
      <div className="space-y-3 min-h-[500px]">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <TaskCard
                task={task}
                onUpdate={(updatedTask) => onTaskUpdate(task._id, updatedTask.status)}
                onDelete={(taskId) => {
                  // Handle task deletion
                  console.log('Delete task:', taskId);
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {tasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-32 text-white/50"
          >
            <p className="text-center">
              No tasks in this column
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskColumn;