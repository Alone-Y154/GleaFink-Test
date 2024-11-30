// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const salesData = useSelector((state) => state.chart.salesData);

  if (!salesData) {
    return <p>Loading...</p>;
  }

  // Step 1: Aggregate sales data by country
  const aggregatedData = salesData.reduce((acc, item) => {
    const { country, sales } = item;
    if (acc[country]) {
      acc[country] += sales; // Sum sales if country already exists
    } else {
      acc[country] = sales; // Initialize sales for new country
    }
    return acc;
  }, {});

    /* {
        "USA": 1120,
        "Germany": 680,
    } */

  // Step 2: Prepare data for the chart
  const labels = Object.keys(aggregatedData); // ["USA","Germany"]
  const data = Object.values(aggregatedData); // [1120,680]

  console.log("aggregatedData",aggregatedData,labels,data)
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Sales',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
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
        text: 'Sales Data by Country',
      },
    },
  };

  return (
    <div className="p-4">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;