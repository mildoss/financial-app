import { Pie } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, type TooltipItem} from 'chart.js';
import type {FC} from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  balance: number;
  income: number;
  expenses: number;
}

export const BalanceChart: FC<Props> = ({ balance, income, expenses }) => {
  const data = {
    labels: ['Income', 'Expenses', 'Balance'],
    datasets: [
      {
        label: 'Total finances',
        data: [income, expenses, balance],
        backgroundColor: [
          'rgba(5, 150, 105, 0.8)',
          'rgba(220, 38, 38, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgba(5, 150, 105, 1)',
          'rgba(220, 38, 38, 1)',
          'rgba(245, 158, 11, 1)',
        ],

        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const,
      labels: {
          color: '#ffffff',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'pie'>) {
            return `${context.label}: ${context.raw} UAH`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};
