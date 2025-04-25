import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DashboardAnalytics = () => {
    const projectStatusData = {
        labels: ['Ongoing', 'Completed'],
        datasets: [
          {
            label: 'Projects',
            data: [7, 3],
            backgroundColor: ['#facc15', '#4ade80'],
            borderColor: '#1e293b',
            borderWidth: 2,
          },
        ],
      };
      
      const departmentWorkloadData = {
        labels: ['Water', 'Sanitation', 'PWD', 'Electricity'],
        datasets: [
          {
            label: 'Projects',
            data: [3, 1, 4, 2],
            backgroundColor: ['#60a5fa', '#c084fc', '#f472b6', '#facc15'],
            borderRadius: 8,
          },
        ],
      };
  return (
    <div className="min-h-screen bg-gray-900 p-10 text-white">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-extrabold tracking-tight text-white">
            🚀 Dashboard Analytics
          </h2>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Project Status */}
          <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg border border-white/10 hover:shadow-yellow-400/30 transition">
            <h3 className="text-xl font-semibold mb-4 text-yellow-300">📌 Project Status</h3>
            <Pie
              data={projectStatusData}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: '#f9fafb',
                      font: { size: 14, family: 'Inter' },
                    },
                  },
                },
              }}
            />
          </div>

          {/* Department Workload */}
          <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg border border-white/10 hover:shadow-blue-400/30 transition">
            <h3 className="text-xl font-semibold mb-4 text-blue-300">🏢 Department Workload</h3>
            <Bar
              data={departmentWorkloadData}
              options={{
                scales: {
                  x: {
                    ticks: {
                      color: '#f9fafb',
                      font: { size: 12 },
                    },
                    grid: {
                      color: '#334155',
                    },
                  },
                  y: {
                    ticks: {
                      color: '#f9fafb',
                      font: { size: 12 },
                    },
                    grid: {
                      color: '#334155',
                    },
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      color: '#f9fafb',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
