import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import InputField from '../components/InputField';

const ProjectManagement = () => {
  const projectsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    id: '',
    name: '',
    description: '',
    value: '',
    completion: 0,
  });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const sampleData = [
      { id: '1', name: 'Website Redesign', description: 'Complete overhaul of company website', value: 15000, completion: 75 },
      { id: '2', name: 'Mobile App Development', description: 'iOS and Android app for customer portal', value: 35000, completion: 30 },
      { id: '3', name: 'CRM Implementation', description: 'Salesforce integration for sales team', value: 25000, completion: 90 },
    ];
    setProjects(sampleData);
  }, []);

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSave = () => {
    if (modalData.id) {
      setProjects(projects.map(p => (p.id === modalData.id ? modalData : p)));
    } else {
      setProjects([...projects, { ...modalData, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const completionColor = (value) => {
    if (value < 30) return 'bg-red-500';
    if (value < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar with reduced width */}
      <div className="w-25 fixed md:relative z-40">
        <Sidebar />
      </div>

      {/* Main content with left margin to avoid overlap */}
      <div className="flex-1 md:ml-40">
        <Navbar />
        <main className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <h1 className="text-2xl font-bold text-indigo-600">Project Management</h1>
            <SearchBar
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => {
                setModalData({ id: '', name: '', description: '', value: '', completion: 0 });
                setIsModalOpen(true);
              }}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            {filteredProjects.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                No projects found. {searchTerm ? 'Try a different search.' : 'Add a new project.'}
              </p>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-3 text-left">Project Name</th>
                    <th className="py-3 text-left">Description</th>
                    <th className="py-3 text-left">Value</th>
                    <th className="py-3 text-left">Completion</th>
                    <th className="py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {currentProjects.map(p => (
                    <tr key={p.id}>
                      <td className="py-4 font-medium">{p.name}</td>
                      <td className="py-4 text-gray-600">{p.description}</td>
                      <td className="py-4 text-indigo-600 font-semibold">${p.value.toLocaleString()}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${completionColor(p.completion)}`}
                              style={{ width: `${p.completion}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-500">{p.completion}%</span>
                        </div>
                      </td>
                      <td className="py-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setModalData(p);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg space-y-6 shadow-xl">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-semibold text-indigo-700">
                {modalData.id ? 'Edit Project' : 'Add Project'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-red-500 text-2xl"
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
                textarea
                value={modalData.description}
                onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
              />
              <InputField
                type="number"
                placeholder="Value ($)"
                value={modalData.value}
                onChange={(e) => setModalData({ ...modalData, value: Number(e.target.value) })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Completion: {modalData.completion}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={modalData.completion}
                  onChange={(e) => setModalData({ ...modalData, completion: parseInt(e.target.value, 10) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 border-t pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
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
