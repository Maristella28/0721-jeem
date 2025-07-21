import React from 'react';
import Navbares from "../../components/Navbares";
import Sidebares from "../../components/Sidebares";

const OrganizationalChart = () => {
  return (
    <>
      <Navbares />
      <Sidebares />

      <main className="bg-green-50 min-h-screen ml-64 pt-36 px-6 pb-16 font-sans flex flex-col items-center">
        <div className="w-full max-w-6xl space-y-14">

          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-green-900 tracking-tight border-b-4 border-green-500 inline-block pb-2">
              🏛️ Barangay Organizational Chart
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              An overview of leadership and key roles in the barangay.
            </p>
          </div>

          {/* Barangay Captain */}
          <div className="flex flex-col items-center space-y-2">
            <div className="text-lg font-semibold text-green-800">Barangay Captain</div>
            <div className="w-48 h-20 bg-green-300 rounded-xl flex items-center justify-center shadow-md border">
              <span className="text-3xl">👤</span>
            </div>
          </div>

          {/* Kagawads */}
          <div className="space-y-4">
            <h2 className="text-center text-lg font-semibold text-green-800">Barangay Councilors (Kagawads)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="w-36 h-20 bg-green-200 rounded-xl flex items-center justify-center shadow-md border hover:shadow-lg transition"
                >
                  <span className="text-2xl">👤</span>
                </div>
              ))}
            </div>
          </div>

          {/* Secretary and Treasurer */}
          <div className="flex flex-col sm:flex-row justify-center gap-10 items-center">
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-green-700 mb-1">Secretary</div>
              <div className="w-36 h-16 bg-green-100 rounded-xl flex items-center justify-center border shadow">
                <span className="text-2xl">👤</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-green-700 mb-1">Treasurer</div>
              <div className="w-36 h-16 bg-green-100 rounded-xl flex items-center justify-center border shadow">
                <span className="text-2xl">👤</span>
              </div>
            </div>
          </div>

          {/* SK Chairman */}
          <div className="flex flex-col items-center space-y-2">
            <div className="text-sm font-medium text-green-700">SK Chairman</div>
            <div className="w-40 h-16 bg-green-100 rounded-xl flex items-center justify-center border shadow">
              <span className="text-2xl">👤</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrganizationalChart;
