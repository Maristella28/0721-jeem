import React, { useState } from 'react';
import Navbares from "../../components/Navbares";
import Sidebares from "../../components/Sidebares";


const BrgyResidency = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    purpose: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    console.log('Certificate of Residency Request:', formData);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ fullName: '', address: '', purpose: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <>
      <Navbares />
      <div className="flex min-h-screen bg-green-50">
        <Sidebares />
        <main className="flex-1 ml-64 pt-20 px-6">
          {/* Back Button outside the container */}
          <div className="max-w-3xl mx-auto mt-8 mb-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="bg-green-200 text-green-800 hover:bg-green-300 px-4 py-2 rounded-md font-medium flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>

          {/* Form Container */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg px-8 py-10 mb-12 border border-green-100">
            <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
              🏠 Certificate of Residency
            </h1>

            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded mb-6 text-center font-medium">
                ✅ Your residency request has been submitted successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block font-semibold text-gray-800 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 transition ${
                    errors.fullName
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-green-300 focus:ring-green-500'
                  }`}
                  placeholder="Juan Dela Cruz"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block font-semibold text-gray-800 mb-2">
                  Complete Address
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 transition ${
                    errors.address
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-green-300 focus:ring-green-500'
                  }`}
                  placeholder="123 Purok St., Barangay Example"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              {/* Purpose */}
              <div>
                <label htmlFor="purpose" className="block font-semibold text-gray-800 mb-2">
                  Purpose
                </label>
                <input
                  id="purpose"
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 transition ${
                    errors.purpose
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-green-300 focus:ring-green-500'
                  }`}
                  placeholder="e.g., Employment Requirement"
                />
                {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition flex justify-center items-center"
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                )}
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default BrgyResidency;