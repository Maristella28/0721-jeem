import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  XMarkIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  UserIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

const StatCard = ({ label, value, icon, iconBg }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex justify-between items-center group">
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-3xl font-bold text-green-600 group-hover:text-emerald-600 transition">{value}</p>
    </div>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg}`}>
      {icon}
    </div>
  </div>
);

const badge = (text, color, icon = null) => (
  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${color}`}>
    {icon && icon}
    {text}
  </span>
);

const getDocumentTypeColor = (type) => {
  switch (type) {
    case 'Brgy Clearance':
      return 'bg-blue-100 text-blue-800';
    case 'Cedula':
      return 'bg-green-100 text-green-800';
    case 'Brgy Indigency':
      return 'bg-purple-100 text-purple-800';
    case 'Brgy Residency':
      return 'bg-orange-100 text-orange-800';
    case 'Brgy Business Permit':
      return 'bg-pink-100 text-pink-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getDocumentTypeIcon = (type) => {
  switch (type) {
    case 'Brgy Clearance':
      return <DocumentTextIcon className="w-3 h-3" />;
    case 'Cedula':
      return <DocumentIcon className="w-3 h-3" />;
    case 'Brgy Indigency':
      return <AcademicCapIcon className="w-3 h-3" />;
    case 'Brgy Residency':
      return <BuildingOfficeIcon className="w-3 h-3" />;
    case 'Brgy Business Permit':
      return <BuildingOfficeIcon className="w-3 h-3" />;
    default:
      return <DocumentTextIcon className="w-3 h-3" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    case 'Processing':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Approved':
      return <CheckCircleIcon className="w-3 h-3" />;
    case 'Pending':
      return <ClockIcon className="w-3 h-3" />;
    case 'Rejected':
      return <ExclamationTriangleIcon className="w-3 h-3" />;
    case 'Processing':
      return <ClockIcon className="w-3 h-3" />;
    default:
      return <ClockIcon className="w-3 h-3" />;
  }
};

const records = [
  {
    id: 1,
    residentId: 'RES-001',
    name: 'Jerry The Mouse',
    nationalId: '000-1111-222-33',
    age: 23,
    civilStatus: 'Single',
    gender: 'Male',
    documentType: 'Brgy Clearance',
    status: 'Approved',
    requestDate: '2024-01-15',
    approvedDate: '2024-01-20',
    contactNumber: '+63 912 345 6789',
    email: 'jerry.mouse@email.com',
    address: '123 Barangay Street, City',
    purpose: 'Employment requirement',
    remarks: 'All requirements submitted and verified',
  },
  {
    id: 2,
    residentId: 'RES-002',
    name: 'Tom Cat',
    nationalId: '000-2222-333-44',
    age: 28,
    civilStatus: 'Married',
    gender: 'Male',
    documentType: 'Cedula',
    status: 'Pending',
    requestDate: '2024-01-18',
    approvedDate: null,
    contactNumber: '+63 923 456 7890',
    email: 'tom.cat@email.com',
    address: '456 Neighborhood Ave, City',
    purpose: 'Business registration',
    remarks: 'Under review',
  },
  {
    id: 3,
    residentId: 'RES-003',
    name: 'Spike Bulldog',
    nationalId: '000-3333-444-55',
    age: 35,
    civilStatus: 'Married',
    gender: 'Male',
    documentType: 'Brgy Indigency',
    status: 'Processing',
    requestDate: '2024-01-20',
    approvedDate: null,
    contactNumber: '+63 934 567 8901',
    email: 'spike.bulldog@email.com',
    address: '789 Community Road, City',
    purpose: 'Social welfare assistance',
    remarks: 'Documents being verified',
  },
  {
    id: 4,
    residentId: 'RES-004',
    name: 'Tyke Bulldog',
    nationalId: '000-4444-555-66',
    age: 8,
    civilStatus: 'Single',
    gender: 'Male',
    documentType: 'Brgy Residency',
    status: 'Approved',
    requestDate: '2024-01-10',
    approvedDate: '2024-01-12',
    contactNumber: '+63 945 678 9012',
    email: 'tyke.bulldog@email.com',
    address: '789 Community Road, City',
    purpose: 'School enrollment',
    remarks: 'Residency confirmed',
  },
  {
    id: 5,
    residentId: 'RES-005',
    name: 'Butch Cat',
    nationalId: '000-5555-666-77',
    age: 30,
    civilStatus: 'Single',
    gender: 'Male',
    documentType: 'Brgy Business Permit',
    status: 'Rejected',
    requestDate: '2024-01-05',
    approvedDate: null,
    contactNumber: '+63 956 789 0123',
    email: 'butch.cat@email.com',
    address: '321 Business District, City',
    purpose: 'Business operation',
    remarks: 'Incomplete requirements',
  },
];

const DocumentsRecords = () => {
  const [filteredRecords, setFilteredRecords] = useState(records);
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    setFilteredRecords(
      records.filter((record) =>
        record.name.toLowerCase().includes(search.toLowerCase()) ||
        record.residentId.toLowerCase().includes(search.toLowerCase()) ||
        record.documentType.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const handleShowDetails = (record) => {
    if (selectedRecord?.id === record.id) {
      setSelectedRecord(null);
    } else {
      setSelectedRecord(record);
    }
  };

  const handleEdit = (record) => {
    setEditData(record);
    setShowModal(true);
  };

  const handleSave = () => {
    // Handle save logic here
    setShowModal(false);
    setEditData({});
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusCount = (status) => {
    return records.filter(record => record.status === status).length;
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-gradient-to-br from-green-50 to-white min-h-screen ml-64 pt-36 px-6 pb-16 font-sans">
        <div className="w-full max-w-7xl mx-auto space-y-8">
          {/* Enhanced Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-xl mb-4">
              <DocumentTextIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent tracking-tight">
              Documents & Certificates Records
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Comprehensive management system for barangay document requests and certificate issuance with real-time tracking.
            </p>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              label="Total Requests"
              value={records.length}
              icon={<DocumentTextIcon className="w-6 h-6 text-green-600" />}
              iconBg="bg-green-100"
            />
            <StatCard
              label="Approved"
              value={getStatusCount('Approved')}
              icon={<CheckCircleIcon className="w-6 h-6 text-emerald-600" />}
              iconBg="bg-emerald-100"
            />
            <StatCard
              label="Pending"
              value={getStatusCount('Pending')}
              icon={<ClockIcon className="w-6 h-6 text-yellow-600" />}
              iconBg="bg-yellow-100"
            />
            <StatCard
              label="Processing"
              value={getStatusCount('Processing')}
              icon={<ClockIcon className="w-6 h-6 text-blue-600" />}
              iconBg="bg-blue-100"
            />
          </div>

          {/* Enhanced Search and Add Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex gap-3">
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                  <DocumentTextIcon className="w-5 h-5" />
                  Show Document List
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                  <DocumentIcon className="w-5 h-5" />
                  Show Certificate List
                </button>
                <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                  <PlusIcon className="w-5 h-5" />
                  Request Document
                </button>
              </div>

              <div className="flex gap-3 items-center w-full max-w-md">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-xl text-sm shadow-sm transition-all duration-300"
                    placeholder="Search by name, ID, or document type..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
                </div>
                <button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300">
                  <FunnelIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Table */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5" />
                Document Records
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Resident ID</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Full Name</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">National ID</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">Age</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">Civil Status</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">Gender</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">Document Type</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <DocumentTextIcon className="w-12 h-12 text-gray-300" />
                          <p className="text-gray-500 font-medium">No document records found</p>
                          <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((record) => (
                      <React.Fragment key={record.id}>
                        <tr className="hover:bg-green-50 transition-all duration-200 group">
                          <td className="px-6 py-4">
                            <span className="font-mono text-green-600 bg-green-50 px-2 py-1 rounded text-xs">
                              {record.residentId}
                            </span>
                          </td>
                          <td
                            onClick={() => handleShowDetails(record)}
                            className="px-6 py-4 cursor-pointer group-hover:text-green-600 transition-colors duration-200"
                          >
                            <div className="font-semibold text-gray-900">
                              {record.name}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <EyeIcon className="w-3 h-3" />
                              Click to view details
                            </div>
                          </td>
                          <td className="px-4 py-4 text-gray-700">{record.nationalId}</td>
                          <td className="px-4 py-4">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                              {record.age} years
                            </span>
                          </td>
                          <td className="px-4 py-4 text-gray-700">{record.civilStatus}</td>
                          <td className="px-4 py-4 text-gray-700">{record.gender}</td>
                          <td className="px-4 py-4">
                            {badge(record.documentType, getDocumentTypeColor(record.documentType), getDocumentTypeIcon(record.documentType))}
                          </td>
                          <td className="px-4 py-4">
                            {badge(record.status, getStatusColor(record.status), getStatusIcon(record.status))}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleShowDetails(record)}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1 transition-all duration-300 transform hover:scale-105"
                              >
                                <EyeIcon className="w-3 h-3" />
                                View
                              </button>
                              <button
                                onClick={() => handleEdit(record)}
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1 transition-all duration-300 transform hover:scale-105"
                              >
                                <PencilIcon className="w-3 h-3" />
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>

                        {selectedRecord?.id === record.id && (
                          <tr className="bg-gradient-to-r from-green-50 to-emerald-50">
                            <td colSpan="9" className="px-8 py-8">
                              <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-200">
                                <div className="flex flex-col lg:flex-row gap-8 items-start">
                                  {/* Document Information Card */}
                                  <div className="flex-1 space-y-6">
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                      <h4 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                                        <DocumentTextIcon className="w-5 h-5" /> Document Information
                                      </h4>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div><span className="font-medium text-gray-700">Document Type:</span> <span className="text-gray-900">{selectedRecord.documentType}</span></div>
                                        <div><span className="font-medium text-gray-700">Status:</span> <span className="text-gray-900">{selectedRecord.status}</span></div>
                                        <div><span className="font-medium text-gray-700">Request Date:</span> <span className="text-gray-900">{formatDate(selectedRecord.requestDate)}</span></div>
                                        <div><span className="font-medium text-gray-700">Approved Date:</span> <span className="text-gray-900">{formatDate(selectedRecord.approvedDate)}</span></div>
                                        <div><span className="font-medium text-gray-700">Purpose:</span> <span className="text-gray-900">{selectedRecord.purpose}</span></div>
                                        <div><span className="font-medium text-gray-700">Remarks:</span> <span className="text-gray-900">{selectedRecord.remarks}</span></div>
                                      </div>
                                    </div>

                                    {/* Resident Information Card */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                      <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                                        <UserIcon className="w-5 h-5" /> Resident Information
                                      </h4>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div><span className="font-medium text-gray-700">Resident ID:</span> <span className="text-gray-900">{selectedRecord.residentId}</span></div>
                                        <div><span className="font-medium text-gray-700">Full Name:</span> <span className="text-gray-900">{selectedRecord.name}</span></div>
                                        <div><span className="font-medium text-gray-700">National ID:</span> <span className="text-gray-900">{selectedRecord.nationalId}</span></div>
                                        <div><span className="font-medium text-gray-700">Age:</span> <span className="text-gray-900">{selectedRecord.age} years</span></div>
                                        <div><span className="font-medium text-gray-700">Civil Status:</span> <span className="text-gray-900">{selectedRecord.civilStatus}</span></div>
                                        <div><span className="font-medium text-gray-700">Gender:</span> <span className="text-gray-900">{selectedRecord.gender}</span></div>
                                        <div><span className="font-medium text-gray-700">Contact Number:</span> <span className="text-gray-900">{selectedRecord.contactNumber}</span></div>
                                        <div><span className="font-medium text-gray-700">Email:</span> <span className="text-gray-900">{selectedRecord.email}</span></div>
                                        <div><span className="font-medium text-gray-700">Address:</span> <span className="text-gray-900">{selectedRecord.address}</span></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Enhanced Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-3xl shadow-2xl border border-green-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-3xl p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <PencilIcon className="w-6 h-6" />
                    Edit Document Record
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white hover:text-red-200 transition-colors duration-200"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Document Type</label>
                    <select
                      value={editData.documentType || ''}
                      onChange={(e) => setEditData({...editData, documentType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select Document Type</option>
                      <option value="Brgy Clearance">Brgy Clearance</option>
                      <option value="Cedula">Cedula</option>
                      <option value="Brgy Indigency">Brgy Indigency</option>
                      <option value="Brgy Residency">Brgy Residency</option>
                      <option value="Brgy Business Permit">Brgy Business Permit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <select
                      value={editData.status || ''}
                      onChange={(e) => setEditData({...editData, status: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Purpose</label>
                    <input
                      type="text"
                      value={editData.purpose || ''}
                      onChange={(e) => setEditData({...editData, purpose: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter purpose"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Remarks</label>
                    <input
                      type="text"
                      value={editData.remarks || ''}
                      onChange={(e) => setEditData({...editData, remarks: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter remarks"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default DocumentsRecords;