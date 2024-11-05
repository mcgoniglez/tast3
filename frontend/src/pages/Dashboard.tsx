import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTasks } from '../store/taskSlice';
import TaskList from '../components/TaskList';
import TaskChart from '../components/TaskChart';
import NotificationBar from '../components/NotificationBar';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.items);
  const taskStats = useAppSelector((state) => state.tasks.stats);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <NotificationBar />
      <TaskChart data={taskStats} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Dashboard;
