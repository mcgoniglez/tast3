// src/components/TaskDetail.tsx

import React from 'react';
import { Task } from '../types';
import { useAppDispatch } from '../store/hooks';
import { updateTaskStatus } from '../store/taskSlice';

interface TaskDetailProps {
  task: Task;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateTaskStatus({ id: task.id, status: e.target.value }));
  };

  return (
    <div className="task-detail">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <label>Status:</label>
      <select value={task.status} onChange={handleStatusChange}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      {/* Display attachments if any */}
      {task.attachments && (
        <div>
          <h4>Attachments:</h4>
          <ul>
            {task.attachments.map((file, index) => (
              <li key={index}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
