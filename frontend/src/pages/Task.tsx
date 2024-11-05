import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTaskById } from '../store/taskSlice';
import TaskDetail from '../components/TaskDetail';
import { RootState, useAppDispatch, useAppSelector } from '../store';

const TaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const task = useAppSelector((state: RootState) => state.tasks.selectedTask);

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskById(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <div className="task-page">
      {task ? <TaskDetail task={task} /> : <p>Loading task...</p>}
    </div>
  );
};

export default TaskPage;
