import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbares from '../../components/Navbares';
import Sidebares from '../../components/Sidebares';

const Project = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbares />
      <Sidebares />

        <main className="bg-green-50 min-h-screen ml-64 pt-36 px-6 py-12 font-sans flex flex-col items-center">
        <div className="w-full max-w-6xl space-y-10">

          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-green-900 tracking-tight border-b-4 border-green-500 inline-block pb-2">
              🌿 Barangay Projects
            </h1>
            <p className="text-gray-600 mt-2 text-sm">Empowering the community through development initiatives.</p>
          </div>

          {/* Project Section */}
          <div className="bg-green-200 rounded-2xl shadow-xl p-8 space-y-8">

            <div className="flex flex-col md:flex-row gap-8">
              {/* Image/Chart Section */}
              <div className="flex-1 bg-white rounded-xl shadow-md p-4 border border-green-300 flex items-center justify-center">
                <img
                  src="https://salaymisor.gov.ph/wp-content/uploads/2020/12/20200828_090843.jpg"
                  alt="Projects Chart"
                  className="rounded-lg max-h-[20rem] object-cover w-full"
                />
              </div>

              {/* Project Details */}
              <div className="w-full md:w-1/2 space-y-6 text-sm text-gray-800">

                {/* Project 1 */}
                <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all">
                  <h2 className="text-xl font-bold text-green-700">Project 1</h2>
                  <p className="font-semibold text-gray-700 mt-1">Barangay Health and Wellness Hub</p>
                  <p className="mt-2 text-sm">
                    <strong className="text-gray-600">Objective:</strong> Improve access to health services and promote wellness activities within the community.
                  </p>
                  <p className="mt-2 text-green-800 font-medium">💰 Estimated Cost: PHP 50,000</p>
                </div>

                {/* Project 2 */}
                <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all">
                  <h2 className="text-xl font-bold text-green-700">Project 2</h2>
                  <p className="font-semibold text-gray-700 mt-1">Barangay Youth Tech Center</p>
                  <p className="mt-2 text-sm">
                    <strong className="text-gray-600">Objective:</strong> Provide access to technology and digital literacy training for the youth in the barangay.
                  </p>
                  <p className="mt-2 text-green-800 font-medium">💰 Estimated Cost: PHP 95,000</p>
                </div>

              </div>
            </div>

            {/* Feedback Button */}
            <div className="text-center">
              <button
                onClick={() => navigate('/residents/addFeedback')}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m-2 8c-4.418 0-8-1.79-8-4V5a2 2 0 012-2h16a2 2 0 012 2v11c0 2.21-3.582 4-8 4h-2z" />
                </svg>
                Add Feedback
              </button>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default Project;
