import React, { useState } from 'react';

export default function Analytics() {
  const [fileName, setFileName] = useState('');
  const [isFileDropped, setIsFileDropped] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior to allow dropping
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    // Check if the dropped file is a PDF
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      setIsFileDropped(true);
    } else {
      alert('Please drop a valid PDF file!');
      setFileName('');
      setIsFileDropped(false);
    }
  };

  const handleUpload = () => {
    // Implement your upload logic here
    if (fileName) {
      console.log('Uploading:', fileName);
      // Reset the file name after upload (optional)
      // setFileName('');
      // setIsFileDropped(false);
    }
  };

  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="w-3/4 p-8">
        <h1 className="text-4xl font-bold mb-4">Analytics</h1>
        <p className="mb-8">Set categories-wise spend targets and alert on expense exceeded</p>
        <div className="flex items-center justify-center w-full mb-4">
          <label
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF files only</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.type === 'application/pdf') {
                  setFileName(file.name);
                  setIsFileDropped(true);
                } else {
                  alert('Please select a valid PDF file!');
                  setFileName('');
                  setIsFileDropped(false);
                }
              }}
            />
          </label>
        </div>
        {isFileDropped && (
          <div className="text-green-600 mb-4">✅ {fileName} successfully dropped!</div>
        )}
        <button
          onClick={handleUpload}
          className="w-full bg-red-500 text-white p-2 rounded shadow hover:bg-red-600 transition"
          disabled={!isFileDropped}
        >
          Upload and get your expenditure analysis!
        </button>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Get Analysis for a</h2>
          <ul>
            <li>
              <label className="flex items-center mb-2">
                <input type="checkbox" className="mr-2" />
                Month
              </label>
            </li>
            <li>
              <label className="flex items-center mb-2">
                <input type="checkbox" className="mr-2" />
                Week
              </label>
            </li>
            <li>
              <label className="flex items-center mb-2">
                <input type="checkbox" className="mr-2" />
                Day
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
