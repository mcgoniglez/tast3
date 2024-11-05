import React from 'react';
import { Bar } from 'react-chartjs-2';

interface TaskChartProps {
  data: {
    pending: number;
    inProgress: number;
    completed: number;
  };
}

const TaskChart: React.FC<TaskChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Tasks',
        data: [data.pending, data.inProgress, data.completed],
        backgroundColor: ['red', 'yellow', 'green'],
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default TaskChart;
