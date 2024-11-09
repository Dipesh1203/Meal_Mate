import React from "react";
import ForecastChart from "../components/analytics.jsx";

const forecastData = {
  forecast_dates: [
    "2023-11-01",
    "2023-11-02",
    "2023-11-03",
    "2023-11-04",
    "2023-11-05",
    "2023-11-06",
    "2023-11-07",
    "2023-11-08",
    "2023-11-09",
    "2023-11-10",
  ],
  confidence_intervals: [
    { lower: 76.67, upper: 133.09 },
    { lower: 83.72, upper: 140.06 },
    { lower: 98.54, upper: 154.95 },
    { lower: 122.44, upper: 178.77 },
    { lower: 144.01, upper: 200.35 },
    { lower: 71.35, upper: 127.69 },
    { lower: 81.68, upper: 138.02 },
    { lower: 71.48, upper: 140.34 },
    { lower: 76.13, upper: 144.71 },
    { lower: 93.46, upper: 162.1 },
  ],
};

function App() {
  return (
    <div>
      <h1>Average Confidence Chart</h1>
      <ForecastChart data={forecastData} />
    </div>
  );
}

export default App;
