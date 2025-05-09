import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import InputField from '../components/InputField';

const ProjectManagement = () => {
  const projectsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    id: '',
    name: '',
    description: '',
    value: '',
    completion: 0
  });
  const [projects, setProjects] = useState([]);

  // Load sample data on first render
  useEffect(() => {
    const sampleProjects = [
      { id: '1', name: 'Website Redesign', description: 'Complete overhaul of company website', value: 15000, completion: 75 },
      { id: '2', name: 'Mobile App Development', description: 'iOS and Android app for customer portal', value: 35000, completion: 30 },
      { id: '3', name: 'CRM Implementation', description: 'Salesforce integration for sales team', value: 25000, completion: 90 }
    ];
    setProjects(sampleProjects);
  }, []);

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSave = () => {
    if (modalData.id) {
      // Update existing project
      setProjects(projects.map(project => 
        project.id === modalData.id ? modalData : project
      ));
    } else {
      // Add new project
      const newProject = {
        ...modalData,
        id: Date.now().toString()
      };
      setProjects([...projects, newProject]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  const completionColor = (percentage) => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 relative">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 space-y-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">Project Management</h1>

          <div className="max-w-md">
            <SearchBar
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              setModalData({ id: '', name: '', description: '', value: '', completion: 0 });
              setModalOpen(true);
            }}
            className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm relative">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No projects found. {searchTerm ? 'Try a different search.' : 'Add a project to get started.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm relative z-10">
                <thead className="text-left">
                  <tr className="text-gray-500 border-b">
                    <th className="py-3 pr-4 whitespace-nowrap">Project Name</th>
                    <th className="py-3 pr-4 whitespace-nowrap">Description</th>
                    <th className="py-3 pr-4 whitespace-nowrap">Value</th>
                    <th className="py-3 pr-4 whitespace-nowrap">Completion</th>
                    <th className="py-3 pr-4 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 transition">
                      <td className="py-4 pr-4 whitespace-nowrap font-medium">{project.name}</td>
                      <td className="py-4 pr-4">
                        <span className="text-sm text-gray-600">{project.description}</span>
                      </td>
                      <td className="py-4 pr-4 font-semibold text-indigo-600 whitespace-nowrap">
                        ${project.value.toLocaleString()}
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className={`h-2.5 rounded-full ${completionColor(project.completion)}`}
                              style={{ width: `${project.completion}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">{project.completion}%</span>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-right space-x-2">
                        <button 
                          onClick={() => {
                            setModalData(project);
                            setModalOpen(true);
                          }} 
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <Pencil className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)} 
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] transition-all duration-300">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl space-y-6 relative animate-fadeIn">
            
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-2xl font-semibold text-indigo-700">
                {modalData.id ? 'Edit' : 'Add'} Project
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-red-500 transition duration-200 text-xl"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <InputField
                type="text"
                placeholder="Project Name"
                value={modalData.name}
                onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
              />
              <InputField
                type="text"
                placeholder="Description"
                value={modalData.description}
                onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                textarea
              />
              <InputField
                type="number"
                placeholder="Value ($)"
                value={modalData.value}
                onChange={(e) => setModalData({ ...modalData, value: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Completion: {modalData.completion}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={modalData.completion}
                  onChange={(e) => setModalData({ ...modalData, completion: parseInt(e.target.value) || 0 })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;