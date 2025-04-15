import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import useTask from '../contexts/TaskContext';
import { useEffect } from 'react';

function ClosedByTeam() {
  const { tasksClosedByTeam, getTasksClosedByTeam } = useTask();
  console.log(tasksClosedByTeam);

  useEffect(() => {
    getTasksClosedByTeam();
  }, []);

  const data = {
    labels: Object.keys(tasksClosedByTeam).map((task) => task),
    datasets: [
      {
        label: 'Number of Tasks Closed',
        data: Object.values(tasksClosedByTeam).map((task) => task),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  return (
    <div style={{ width: '500px', margin: 'auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ClosedByTeam;
