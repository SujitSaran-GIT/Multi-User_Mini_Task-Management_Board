import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  FiCheckCircle,
  FiClock,
  FiPlay,
  FiTarget,
  FiTrendingUp,
  FiActivity,
} from 'react-icons/fi';
import { fetchTasks } from '../redux/actions/taskActions';
import MainLayout from '../components/layout/MainLayout';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, stats, loading } = useSelector((state) => state.tasks);
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

  // Chart data
  const statusData = [
    { name: 'Pending', value: stats.pendingTasks, color: '#f59e0b' },
    { name: 'In Progress', value: stats.inProgressTasks, color: '#3b82f6' },
    { name: 'Completed', value: stats.completedTasks, color: '#10b981' },
  ];

  const weeklyData = [
    { day: 'Mon', tasks: 5 },
    { day: 'Tue', tasks: 8 },
    { day: 'Wed', tasks: 12 },
    { day: 'Thu', tasks: 6 },
    { day: 'Fri', tasks: 10 },
    { day: 'Sat', tasks: 4 },
    { day: 'Sun', tasks: 7 },
  ];

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm font-medium">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <FiTrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm ml-1">{trend}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-xl">Loading dashboard...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-white/70 text-lg">
            Here's your task overview and productivity insights
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatCard
            title="Total Tasks"
            value={stats.totalTasks}
            icon={FiTarget}
            color="bg-blue-500"
            trend="+12% this week"
          />
          <StatCard
            title="Completed"
            value={stats.completedTasks}
            icon={FiCheckCircle}
            color="bg-green-500"
            trend="+8% this week"
          />
          <StatCard
            title="In Progress"
            value={stats.inProgressTasks}
            icon={FiPlay}
            color="bg-yellow-500"
          />
          <StatCard
            title="Pending"
            value={stats.pendingTasks}
            icon={FiClock}
            color="bg-orange-500"
          />
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Task Status Distribution */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
              <FiActivity className="w-5 h-5 mr-2" />
              Task Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-white/70 text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
              <FiTrendingUp className="w-5 h-5 mr-2" />
              Weekly Activity
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis
                  dataKey="day"
                  stroke="rgba(255, 255, 255, 0.7)"
                  fontSize={12}
                />
                <YAxis stroke="rgba(255, 255, 255, 0.7)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
        >
          <h3 className="text-white text-lg font-semibold mb-4">Recent Tasks</h3>
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      task.status === 'completed'
                        ? 'bg-green-500'
                        : task.status === 'in-progress'
                        ? 'bg-blue-500'
                        : 'bg-orange-500'
                    }`}
                  />
                  <span className="text-white font-medium">{task.title}</span>
                </div>
                <span className="text-white/70 text-sm capitalize">
                  {task.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
