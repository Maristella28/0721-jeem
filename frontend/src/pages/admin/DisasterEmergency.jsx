import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  XMarkIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  PhoneIcon,
  UserGroupIcon,
  UserIcon,
  CalendarIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

const StatCard = ({ label, value, icon, iconBg, valueColor = "text-green-600" }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex justify-between items-center group">
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className={`text-3xl font-bold ${valueColor} group-hover:text-emerald-600 transition`}>{value}</p>
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

const getDisasterTypeColor = (type) => {
  switch (type) {
    case 'Fire':
      return 'bg-red-100 text-red-800';
    case 'Flood':
      return 'bg-blue-100 text-blue-800';
    case 'Earthquake':
      return 'bg-orange-100 text-orange-800';
    case 'Typhoon':
      return 'bg-purple-100 text-purple-800';
    case 'Medical Emergency':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getDisasterTypeIcon = (type) => {
  switch (type) {
    case 'Fire':
      return <ExclamationTriangleIcon className="w-3 h-3" />;
    case 'Flood':
      return <ExclamationTriangleIcon className="w-3 h-3" />;
    case 'Earthquake':
      return <ExclamationTriangleIcon className="w-3 h-3" />;
    case 'Typhoon':
      return <ExclamationTriangleIcon className="w-3 h-3" />;
    case 'Medical Emergency':
      return <UserIcon className="w-3 h-3" />;
    default:
      return <ExclamationTriangleIcon className="w-3 h-3" />;
  }
};

const disasterHotlines = [
  {
    id: 1,
    type: 'Fire',
    hotline: '123-456-7890',
    description: 'Fire emergency response and evacuation procedures',
    status: 'Active',
    lastUpdated: '2024-01-15',
    contactPerson: 'Fire Chief Juan Santos',
    email: 'firechief@barangay.gov.ph',
    procedure: [
      'Evacuate the building immediately.',
      'Call the fire department hotline.',
      'Do not use elevators.',
      'Assist elderly and children to evacuate safely.',
      'If trapped, stay low and cover your mouth with a cloth.',
    ],
  },
  {
    id: 2,
    type: 'Flood',
    hotline: '987-654-3210',
    description: 'Flood emergency response and safety procedures',
    status: 'Active',
    lastUpdated: '2024-01-18',
    contactPerson: 'Emergency Coordinator Maria Reyes',
    email: 'emergency@barangay.gov.ph',
    procedure: [
      'Move to higher ground immediately.',
      'Do not walk or drive through floodwaters.',
      'Stay tuned to local news for updates.',
      'Turn off utilities if instructed.',
      'Avoid contact with contaminated water.',
    ],
  },
  {
    id: 3,
    type: 'Earthquake',
    hotline: '555-123-4567',
    description: 'Earthquake emergency response procedures',
    status: 'Active',
    lastUpdated: '2024-01-20',
    contactPerson: 'Disaster Manager Pedro Cruz',
    email: 'disaster@barangay.gov.ph',
    procedure: [
      'Drop, Cover, and Hold On.',
      'Stay indoors until shaking stops.',
      'Check for injuries and damage.',
      'Listen to emergency broadcasts.',
      'Evacuate if building is unsafe.',
    ],
  },
  {
    id: 4,
    type: 'Medical Emergency',
    hotline: '911',
    description: 'Medical emergency response and first aid',
    status: 'Active',
    lastUpdated: '2024-01-22',
    contactPerson: 'Medical Coordinator Ana Garcia',
    email: 'medical@barangay.gov.ph',
    procedure: [
      'Assess the situation and ensure safety.',
      'Call emergency medical services.',
      'Provide basic first aid if trained.',
      'Keep the person calm and comfortable.',
      'Monitor vital signs until help arrives.',
    ],
  },
];

const DisasterEmergency = () => {
  const [filteredHotlines, setFilteredHotlines] = useState(disasterHotlines);
  const [search, setSearch] = useState("");
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [newType, setNewType] = useState('');
  const [newHotline, setNewHotline] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newProcedure, setNewProcedure] = useState('');

  useEffect(() => {
    setFilteredHotlines(
      disasterHotlines.filter((disaster) =>
        disaster.type.toLowerCase().includes(search.toLowerCase()) ||
        disaster.hotline.toLowerCase().includes(search.toLowerCase()) ||
        disaster.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const handleShowDetails = (disaster) => {
    if (selectedDisaster?.id === disaster.id) {
      setSelectedDisaster(null);
    } else {
      setSelectedDisaster(disaster);
    }
  };

  const handleEdit = (disaster) => {
    setEditData(disaster);
    setShowModal(true);
  };

  const handleSave = () => {
    // Handle save logic here
    setShowModal(false);
    setEditData({});
  };

  const handleAddHotline = () => {
    if (!newType || !newHotline || !newProcedure) return;

    const newEntry = {
      id: disasterHotlines.length + 1,
      type: newType,
      hotline: newHotline,
      description: newDescription,
      status: 'Active',
      lastUpdated: new Date().toISOString().split('T')[0],
      contactPerson: 'Emergency Coordinator',
      email: 'emergency@barangay.gov.ph',
      procedure: newProcedure.split('\n').map((step) => step.trim()).filter((step) => step !== ''),
    };

    // In a real app, you would save this to the backend
    console.log('New hotline added:', newEntry);

    setNewType('');
    setNewHotline('');
    setNewDescription('');
    setNewProcedure('');
    setShowAddForm(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDisasterCount = (type) => {
    return disasterHotlines.filter(disaster => disaster.type === type).length;
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
              <ExclamationTriangleIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent tracking-tight">
              Disaster & Emergency Management
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Comprehensive emergency response system for disaster management, hotlines, and safety procedures with real-time coordination.
            </p>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              label="Total Hotlines"
              value={disasterHotlines.length}
              icon={<PhoneIcon className="w-6 h-6 text-green-600" />}
              iconBg="bg-green-100"
              valueColor="text-green-600"
            />
            <StatCard
              label="Fire Emergencies"
              value={getDisasterCount('Fire')}
              icon={<ExclamationTriangleIcon className="w-6 h-6 text-red-600" />}
              iconBg="bg-red-100"
              valueColor="text-red-600"
            />
            <StatCard
              label="Natural Disasters"
              value={getDisasterCount('Flood') + getDisasterCount('Earthquake') + getDisasterCount('Typhoon')}
              icon={<ExclamationTriangleIcon className="w-6 h-6 text-blue-600" />}
              iconBg="bg-blue-100"
              valueColor="text-blue-600"
            />
            <StatCard
              label="Medical Emergencies"
              value={getDisasterCount('Medical Emergency')}
              icon={<UserIcon className="w-6 h-6 text-purple-600" />}
              iconBg="bg-purple-100"
              valueColor="text-purple-600"
            />
          </div>

          {/* Enhanced Search and Add Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <PlusIcon className="w-5 h-5" />
                  {showAddForm ? 'Cancel' : 'Add Emergency Hotline'}
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                  <PhoneIcon className="w-5 h-5" />
                  Emergency Contacts
                </button>
                <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                  <ExclamationTriangleIcon className="w-5 h-5" />
                  Emergency Procedures
                </button>
              </div>

              <div className="flex gap-3 items-center w-full max-w-md">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-xl text-sm shadow-sm transition-all duration-300"
                    placeholder="Search by type, hotline, or description..."
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

            {/* Add Form */}
            {showAddForm && (
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Type of Disaster</label>
                    <input
                      type="text"
                      placeholder="e.g., Fire, Flood, Earthquake"
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Hotline</label>
                    <input
                      type="text"
                      placeholder="e.g., 123-456-7890"
                      value={newHotline}
                      onChange={(e) => setNewHotline(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    placeholder="Brief description of the emergency type"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Response Procedure</label>
                  <textarea
                    placeholder="Step-by-step procedure (one step per line)"
                    value={newProcedure}
                    onChange={(e) => setNewProcedure(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 h-32"
                    rows="5"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleAddHotline}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    Save Hotline
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Table */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                <ExclamationTriangleIcon className="w-5 h-5" />
                Disaster and Emergency Hotlines
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Type of Disaster</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">Emergency Hotline</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">Description</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredHotlines.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <ExclamationTriangleIcon className="w-12 h-12 text-gray-300" />
                          <p className="text-gray-500 font-medium">No emergency hotlines found</p>
                          <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredHotlines.map((disaster) => (
                      <React.Fragment key={disaster.id}>
                        <tr className="hover:bg-green-50 transition-all duration-200 group">
                          <td
                            onClick={() => handleShowDetails(disaster)}
                            className="px-6 py-4 cursor-pointer group-hover:text-green-600 transition-colors duration-200"
                          >
                            <div className="font-semibold text-gray-900">
                              {disaster.type}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <EyeIcon className="w-3 h-3" />
                              Click to view procedures
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="font-mono text-green-600 bg-green-50 px-2 py-1 rounded text-xs">
                              {disaster.hotline}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-gray-700">{disaster.description}</td>
                          <td className="px-4 py-4">
                            {badge(disaster.status, 'bg-green-100 text-green-800', <CheckCircleIcon className="w-3 h-3" />)}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleShowDetails(disaster)}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1 transition-all duration-300 transform hover:scale-105"
                              >
                                <EyeIcon className="w-3 h-3" />
                                View
                              </button>
                              <button
                                onClick={() => handleEdit(disaster)}
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1 transition-all duration-300 transform hover:scale-105"
                              >
                                <PencilIcon className="w-3 h-3" />
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>

                        {selectedDisaster?.id === disaster.id && (
                          <tr className="bg-gradient-to-r from-green-50 to-emerald-50">
                            <td colSpan="5" className="px-8 py-8">
                              <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-200">
                                <div className="flex flex-col lg:flex-row gap-8 items-start">
                                  {/* Emergency Information Card */}
                                  <div className="flex-1 space-y-6">
                                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                                      <h4 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                                        <ExclamationTriangleIcon className="w-5 h-5" /> Emergency Response Procedure
                                      </h4>
                                      <ol className="list-decimal list-inside space-y-2 text-sm">
                                        {selectedDisaster.procedure.map((step, index) => (
                                          <li key={index} className="text-gray-900">{step}</li>
                                        ))}
                                      </ol>
                                    </div>

                                    {/* Contact Information Card */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                      <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                                        <PhoneIcon className="w-5 h-5" /> Contact Information
                                      </h4>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div><span className="font-medium text-gray-700">Contact Person:</span> <span className="text-gray-900">{selectedDisaster.contactPerson}</span></div>
                                        <div><span className="font-medium text-gray-700">Email:</span> <span className="text-gray-900">{selectedDisaster.email}</span></div>
                                        <div><span className="font-medium text-gray-700">Last Updated:</span> <span className="text-gray-900">{formatDate(selectedDisaster.lastUpdated)}</span></div>
                                        <div><span className="font-medium text-gray-700">Status:</span> <span className="text-gray-900">{selectedDisaster.status}</span></div>
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
                    Edit Emergency Hotline
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Type of Disaster</label>
                    <input
                      type="text"
                      value={editData.type || ''}
                      onChange={(e) => setEditData({...editData, type: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter disaster type"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Hotline</label>
                    <input
                      type="text"
                      value={editData.hotline || ''}
                      onChange={(e) => setEditData({...editData, hotline: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter hotline number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <input
                      type="text"
                      value={editData.description || ''}
                      onChange={(e) => setEditData({...editData, description: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter description"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Response Procedure</label>
                    <textarea
                      value={editData.procedure ? editData.procedure.join('\n') : ''}
                      onChange={(e) => setEditData({...editData, procedure: e.target.value.split('\n').filter(step => step.trim())})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 h-32"
                      placeholder="Enter step-by-step procedure (one step per line)"
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

export default DisasterEmergency;