import React from 'react';
import { FaUserTie, FaUsers } from 'react-icons/fa';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const BarangayOfficials = () => {
  const handleOfficialsClick = () => {
  };

  const handleStaffsClick = () => {
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-white min-h-screen ml-64 pt-20 p-8 font-sans">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Barangay Officials & Staffs</h1>
        <div className="flex space-x-40 items-center justify-center mt-35">
          <div
            onClick={handleOfficialsClick}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
          >
            <FaUserTie size={180} className="text-green-600 mb-6" />
            <span className="text-xl font-semibold text-gray-700">Barangay Officials</span>
          </div>
          <div
            onClick={handleStaffsClick}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
          >
            <FaUsers size={180} className="text-green-600 mb-6" />
            <span className="text-xl font-semibold text-gray-700">Barangay Staffs</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default BarangayOfficials;