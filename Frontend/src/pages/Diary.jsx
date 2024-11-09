import React from 'react';

export default function Diary() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-orange-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-4">Budget Diary</h1>
        <p className="text-lg mb-6">Get your manual diary to keep track of your finances</p>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
            <div>
              <h2 className="text-xl font-semibold">Diary 01</h2>
              <p>September, 2024</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Get Details</button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">Edit</button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">Delete</button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
            <div>
              <h2 className="text-xl font-semibold">Diary 02</h2>
              <p>October, 2024</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Get Details</button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">Edit</button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">Delete</button>
            </div>
          </div>
        </div>

        <button className="w-full bg-red-500 text-white py-4 rounded-lg mb-6">Add Diary for this month</button>

        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Add Title</button>
            <input type="text" className="ml-4 flex-1 px-4 py-2 border rounded-lg" />
          </div>
          <div className="flex items-center">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Transaction</button>
            <input type="text" className="ml-4 flex-1 px-4 py-2 border rounded-lg" />
          </div>
          <div className="flex items-center">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Amount</button>
            <input type="text" className="ml-4 flex-1 px-4 py-2 border rounded-lg" />
          </div>
          <div className="flex items-center">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Credited or Debited</button>
            <input type="text" className="ml-4 flex-1 px-4 py-2 border rounded-lg" />
          </div>
          <div className="flex items-center">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Category</button>
            <input type="text" className="ml-4 flex-1 px-4 py-2 border rounded-lg" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Diary Details</h2>
        <table className="w-full table-auto bg-white shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Transactions</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">(Credited/Debited)</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">CTA/Link</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, i) => (
              <tr key={i} className="border-b">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">Text {i + 1}</td>
                <td className="px-4 py-2">Check Requirements</td>
                <td className="px-4 py-2">NA</td>
                <td className="px-4 py-2">12/08/23</td>
                <td className="px-4 py-2">
                  <a href="#" className="text-blue-500">Upload</a>
                </td>
                <td className="px-4 py-2 text-red-500">In-Complete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
