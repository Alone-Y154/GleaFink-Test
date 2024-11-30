// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const salesData = useSelector((state) => state.chart.salesData);

  if (!salesData) {
    return <p>Loading...</p>;
  }

  // Step 1: Aggregate sales data by region
  const aggregatedData = salesData.reduce((acc, item) => {
    const { region, sales } = item;
    if (acc[region]) {
      acc[region] += sales; // Sum sales if region already exists
    } else {
      acc[region] = sales; // Initialize sales for new region
    }
    return acc;
  }, {});

  // Step 2: Prepare data for the pie chart
  const labels = Object.keys(aggregatedData);
  const data = Object.values(aggregatedData);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Sales by Region',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          // Add more colors if you have more regions
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Sales by Region',
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;