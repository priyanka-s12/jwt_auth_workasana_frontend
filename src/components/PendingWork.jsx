import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import useTask from '../contexts/TaskContext';
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

function PendingWork() {
  const { pendingTasks, getPendingTasks } = useTask();
  console.log(pendingTasks);

  useEffect(() => {
    getPendingTasks();
  }, []);

  const data = {
    labels: Object.keys(pendingTasks).map((task) => task),
    datasets: [
      {
        data: Object.values(pendingTasks).map((task) => task),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(90, 235, 54)',
          'rgb(26, 81, 152)',
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div style={{ width: '45%', margin: 'auto' }}>
      <Pie data={data} />
    </div>
  );
}

export default PendingWork;
