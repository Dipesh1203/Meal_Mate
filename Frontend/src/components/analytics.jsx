import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const ForecastChart = ({ data }) => {
  // Extract data from the input
  const { forecast_dates, confidence_intervals } = data;

  // Calculate average confidence values
  const averageConfidenceValues = confidence_intervals.map((ci) => (ci.lower + ci.upper) / 2);

  // Prepare dataset with averaged confidence intervals
  const averageConfidenceDataset = {
    label: 'Average Confidence Value',
    data: averageConfidenceValues,
    borderColor: 'rgba(75, 192, 192, 1)',
    fill: false,
    tension: 0.4,
  };

  const chartData = {
    labels: forecast_dates,
    datasets: [
      averageConfidenceDataset,
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ForecastChart;
