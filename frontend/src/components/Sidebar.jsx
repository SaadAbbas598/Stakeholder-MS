// components/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaProjectDiagram,
  FaChartPie,
  FaFileExport,
  FaSignOutAlt,
  FaBars,
  FaWallet,
} from 'react-icons/fa';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt className="text-blue-500" />, path: '/' },
    { name: 'Stakeholders', icon: <FaUsers className="text-purple-500" />, path: '/stakeholders' },
    { name: 'Projects', icon: <FaProjectDiagram className="text-green-500" />, path: '/projects' },
    { name: 'Financials', icon: <FaWallet className="text-emerald-600" />, path: '/financials' },
    { name: 'Profit Distribution', icon: <FaChartPie className="text-pink-500" />, path: '/profit-distribution' },
    { name: 'Reports', icon: <FaFileExport className="text-yellow-500" />, path: '/reports' },
    { name: 'Logout', icon: <FaSignOutAlt className="text-gray-500" />, path: '/logout' },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4">
        <button onClick={() => setOpen(!open)} className="text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-gray-100 text-black w-64 p-6 transform transition-transform duration-300 z-40 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative`}>
        <h1 className="text-2xl font-bold mb-8 text-center">Profit Tracker</h1>
        <nav className="flex flex-col space-y-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 p-2 rounded transition-colors ${
                  isActive ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-300'
                }`}
                onClick={() => setOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-base">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
