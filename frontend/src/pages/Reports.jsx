import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const Reports = () => {
  const reportsPerPage = 5;

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const staticReports = [
      { id: 'R001', title: 'Sales Q1 Report', category: 'Sales', status: 'Success', date: '2025-04-01' },
      { id: 'R002', title: 'System Downtime', category: 'IT', status: 'Error', date: '2025-04-05' },
      { id: 'R003', title: 'Customer Feedback', category: 'Support', status: 'Warning', date: '2025-04-10' },
      { id: 'R004', title: 'Marketing Campaign', category: 'Marketing', status: 'Success', date: '2025-04-12' },
      { id: 'R005', title: 'Security Audit', category: 'IT', status: 'Warning', date: '2025-04-15' },
      { id: 'R006', title: 'Annual Review', category: 'HR', status: 'Success', date: '2025-04-20' },
      { id: 'R007', title: 'Bug Report', category: 'Development', status: 'Error', date: '2025-04-22' },
    ];
    setReports(staticReports);
  }, []);

  const filteredReports = reports.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * reportsPerPage;
  const indexOfFirst = indexOfLast - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Success': return 'text-green-600 bg-green-100';
      case 'Warning': return 'text-yellow-700 bg-yellow-100';
      case 'Error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-5 fixed md:relative z-40">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-60">
        <Navbar />
        <main className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Reports</h1>
            <SearchBar
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white shadow-sm rounded-xl p-6">
            {filteredReports.length === 0 ? (
              <p className="text-center text-gray-500 py-6">No reports found.</p>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-3">ID</th>
                    <th className="py-3">Title</th>
                    <th className="py-3">Category</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {currentReports.map(report => (
                    <tr key={report.id}>
                      <td className="py-3 font-medium">{report.id}</td>
                      <td className="py-3">{report.title}</td>
                      <td className="py-3 text-gray-600">{report.category}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500">{report.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </main>
      </div>
    </div>
  );
};

export default Reports;
