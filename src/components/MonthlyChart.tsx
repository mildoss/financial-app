import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { FC } from "react";
import type { MonthlyData } from "../types.ts";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyChartProps {
  chartData: MonthlyData[];
  year: number;
}

export const MonthlyChart: FC<MonthlyChartProps> = ({chartData,year}) => {
  const data = {
    labels: chartData.map(item => item.month_name),
    datasets: [
      {
        label: 'Income',
        data: chartData.map(item => item.income),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: chartData.map(item => item.expenses),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `STATS IN ${year}`,
        color: "#ffffff",
        font: {
          size: 20,
        }
      },
      tooltip: {

      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
        },
      },
      x: {
        ticks: {
          color: "#ffffff",
        },
      },
    }
  };

  return <Bar options={options} data={data} />;
}