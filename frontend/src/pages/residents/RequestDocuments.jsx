import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbares from "../../components/Navbares";
import Sidebares from "../../components/Sidebares";
import { FaFileAlt, FaBusinessTime, FaIdBadge, FaHome } from 'react-icons/fa';

const RequestDocuments = () => {
  const navigate = useNavigate();

  const documentOptions = [
    {
      label: "Barangay Clearance",
      icon: <FaFileAlt className="text-green-700 text-5xl mb-4 animate-pulse mx-auto" />,
      route: "/residents/brgyClearance",
    },
    {
      label: "Barangay Business Permit",
      icon: <FaBusinessTime className="text-green-700 text-5xl mb-4 animate-pulse mx-auto" />,
      route: "/residents/brgyBusinessPermit",
    },
    {
      label: "Certificate of Indigency",
      icon: <FaIdBadge className="text-green-700 text-5xl mb-4 animate-pulse mx-auto" />,
      route: "/residents/brgyIndigency",
    },
    {
      label: "Certificate of Residency",
      icon: <FaHome className="text-green-700 text-5xl mb-4 animate-pulse mx-auto" />,
      route: "/residents/brgyResidency",
    },
  ];

  return (
    <>
      <Navbares />
      <div className="flex min-h-screen bg-green-50">
        <Sidebares />

        <main className="flex-1 ml-64 pt-36 px-6 pb-16 font-sans flex flex-col items-center">
          <div className="w-full max-w-6xl space-y-10">

            {/* Page Header */}
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-green-900 tracking-tight border-b-4 border-green-500 inline-block pb-2">
                📄 Request Barangay Documents
              </h1>
              <p className="text-gray-600 mt-2 text-sm max-w-md mx-auto">
                Choose the type of document you need and proceed to request.
              </p>
            </div>

            {/* Document Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
              {documentOptions.map((doc, index) => (
                <div
                  key={index}
                  onClick={() => navigate(doc.route)}
                  className="bg-white border border-green-200 rounded-2xl p-6 w-full max-w-[16rem] text-center shadow-md hover:shadow-green-300 hover:scale-105 transition-all duration-300 cursor-pointer group"
                >
                  {doc.icon}
                  <p className="font-semibold text-green-900 text-base group-hover:underline">
                    {doc.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RequestDocuments;
