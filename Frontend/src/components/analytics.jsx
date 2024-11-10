import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import { FaDownload } from 'react-icons/fa';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const ForecastChart = ({ data }) => {
  const { forecast_dates, confidence_intervals } = data;
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const averageConfidenceValues = confidence_intervals.map((ci) => (ci.lower + ci.upper) / 2);

  const averageConfidenceDataset = {
    label: '',
    data: averageConfidenceValues,
    borderColor: 'rgba(75, 192, 192, 1)',
    fill: false,
    tension: 0.4,
  };

  const chartData = {
    labels: forecast_dates,
    datasets: [averageConfidenceDataset],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Next 10 Days',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity of Food',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Food Quantity Forecast Over the Next 10 Days',
        font: {
          size: 18,
        },
      },
    },
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];

    // Check if the dropped file is a PDF
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      console.log("PDF file uploaded:", droppedFile);
    } else {
      alert('Please upload a PDF file');
    }
  };

  // Handle file submission
  const handleSubmit = () => {
    if (file) {
      alert(`File "${file.name}" submitted successfully!`);
      // You can add logic here to send the file to a server, e.g., using fetch or axios.
    } else {
      alert('Please upload a file before submitting.');
    }
  };

  return (
    <div>
      <Line data={chartData} options={options} />

      {/* Drop area for PDF files */}
      <div
        className={`flex items-center justify-center mt-8 ${
          isDragging ? 'bg-green-300' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="w-80 h-32 bg-gradient-to-r from-green-200 to-green-300 rounded-xl shadow-lg flex flex-col items-center justify-center border-dashed border-2 border-gray-400">
          <p className="text-lg font-semibold text-gray-700">Drop This week's data</p>
          <FaDownload className="text-gray-700 mt-2" size={24} />
        </div>
      </div>

      {file && (
        <div className="mt-4 text-center">
          <p className="text-gray-700">Uploaded File: {file.name}</p>
        </div>
      )}

      {/* Submit button */}
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ForecastChart;
