import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import {
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  XMarkIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
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

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800';
    case 'Planned':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Completed':
      return <CheckCircleIcon className="w-3 h-3" />;
    case 'In Progress':
      return <ClockIcon className="w-3 h-3" />;
    case 'Planned':
      return <ClipboardDocumentListIcon className="w-3 h-3" />;
    default:
      return <ClockIcon className="w-3 h-3" />;
  }
};

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newStatus, setNewStatus] = useState('Planned');
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.name?.toLowerCase().includes(search.toLowerCase()) ||
        project.owner?.toLowerCase().includes(search.toLowerCase()) ||
        project.status?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, projects]);

  const handleAddProject = () => {
    if (!newProjectName || !newOwner || !newDeadline) return;

    const newProject = {
      id: projects.length + 1,
      name: newProjectName,
      owner: newOwner,
      deadline: newDeadline,
      status: newStatus,
    };

    setProjects([...projects, newProject]);

    setNewProjectName('');
    setNewOwner('');
    setNewDeadline('');
    setNewStatus('Planned');
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  };

  const getStatusCount = (status) => {
    return projects.filter(project => project.status === status).length;
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
              <ClipboardDocumentListIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent tracking-tight">
              Project Management
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Track, manage, and organize barangay projects with real-time status and deadlines.
            </p>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              label="Total Projects"
              value={projects.length}
              icon={<ClipboardDocumentListIcon className="w-6 h-6 text-green-600" />}
              iconBg="bg-green-100"
              valueColor="text-green-600"
            />
            <StatCard
              label="Planned"
              value={getStatusCount('Planned')}
              icon={<ClipboardDocumentListIcon className="w-6 h-6 text-yellow-600" />}
              iconBg="bg-yellow-100"
              valueColor="text-yellow-600"
            />
            <StatCard
              label="In Progress"
              value={getStatusCount('In Progress')}
              icon={<ClockIcon className="w-6 h-6 text-blue-600" />}
              iconBg="bg-blue-100"
              valueColor="text-blue-600"
            />
            <StatCard
              label="Completed"
              value={getStatusCount('Completed')}
              icon={<CheckCircleIcon className="w-6 h-6 text-green-600" />}
              iconBg="bg-green-100"
              valueColor="text-green-600"
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
                  {showAddForm ? 'Cancel' : 'Add Project'}
                </button>
              </div>

              <div className="flex gap-3 items-center w-full max-w-md">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-xl text-sm shadow-sm transition-all duration-300"
                    placeholder="Search by project name, owner, or status..."
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name</label>
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Assigned Team / Owner</label>
                    <input
                      type="text"
                      placeholder="Assigned Team / Owner"
                      value={newOwner}
                      onChange={(e) => setNewOwner(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Deadline</label>
                    <input
                      type="date"
                      value={newDeadline}
                      onChange={(e) => setNewDeadline(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="Planned">Planned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleAddProject}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    Save Project
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Table */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                <ClipboardDocumentListIcon className="w-5 h-5" />
                Project Tracker
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Project Name</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">Assigned Team / Owner</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">Deadline</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-4 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <ClipboardDocumentListIcon className="w-12 h-12 text-gray-300" />
                          <p className="text-gray-500 font-medium">No projects found</p>
                          <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-green-50 transition-all duration-200 group">
                        <td className="px-6 py-4 font-semibold text-gray-900">{project.name}</td>
                        <td className="px-4 py-4 text-gray-700">{project.owner}</td>
                        <td className="px-4 py-4 text-gray-700">{project.deadline}</td>
                        <td className="px-4 py-4">
                          {badge(project.status, getStatusColor(project.status), getStatusIcon(project.status))}
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1 transition-all duration-300 transform hover:scale-105"
                          >
                            <XMarkIcon className="w-3 h-3" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectManagement;