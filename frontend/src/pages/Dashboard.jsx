import React, { useState } from "react";
import { UserPlus, Users, UserCheck, UserX } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"; // ✅ Added this line

const Dashboard = () => {
  const [stakeholders] = useState({
    total: 120,
    active: 85,
    inactive: 35,
    new: 8,
  });

  const recentActivities = [
    "John Smith updated",
    "Jane Doe was added",
    "Adrian Addersson Units, Added Iri",
    "Alex Bunth updated Carel Bunth appeared",
    "Jorl Skort asbeuren John Skort was added",
    "Brian Ban updated Tom Ban was added",
    "Martin Gaßrösh John Smith updated",
  ];

  return (
    <div className="flex min-h-screen bg-[#f4f7fe]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f1b42] text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar /> {/* ✅ Navbar at the top */}

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-[#1e1e1e]">Dashboard</h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#2d3e70] text-white p-4 rounded-xl shadow">
              <p>Total Stakeholders</p>
              <h2 className="text-2xl font-bold">{stakeholders.total}</h2>
            </div>
            <div className="bg-[#3c58a6] text-white p-4 rounded-xl shadow">
              <p>Active Stakeholders</p>
              <h2 className="text-2xl font-bold">{stakeholders.active}</h2>
            </div>
            <div className="bg-[#4f73dc] text-white p-4 rounded-xl shadow">
              <p>Inactive Stakeholders</p>
              <h2 className="text-2xl font-bold">{stakeholders.inactive}</h2>
            </div>
            <div className="bg-[#6a92f4] text-white p-4 rounded-xl shadow">
              <p>New Stakeholders</p>
              <h2 className="text-2xl font-bold">{stakeholders.new}</h2>
            </div>
          </div>

          {/* Overview and Activities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overview */}
            <div className="bg-white rounded-xl p-4 shadow">
              <h3 className="font-bold mb-4">Stakeholders Overview</h3>
              <div className="w-40 h-40 mx-auto">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <circle
                    className="text-blue-300"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    r="16"
                    cx="18"
                    cy="18"
                    strokeDasharray="100"
                    strokeDashoffset="0"
                  />
                  <circle
                    className="text-blue-500"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    r="16"
                    cx="18"
                    cy="18"
                    strokeDasharray="75"
                    strokeDashoffset="25"
                  />
                </svg>
                <div className="text-center mt-2 text-sm">
                  <div className="flex justify-center space-x-2">
                    <span className="flex items-center text-blue-500">
                      ● Customer
                    </span>
                    <span className="flex items-center text-blue-400">
                      ● Investor
                    </span>
                  </div>
                  <div className="flex justify-center space-x-2">
                    <span className="flex items-center text-blue-300">
                      ● Employee
                    </span>
                    <span className="flex items-center text-blue-200">
                      ● Partner
                    </span>
                  </div>
                </div>
              </div>
              <button className="mt-4 bg-[#4f73dc] text-white px-4 py-2 rounded hover:bg-[#3c58a6]">
                Add Stakeholder
              </button>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl p-4 shadow">
              <h3 className="font-bold mb-4">Recent Activities</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                {recentActivities.map((activity, index) => (
                  <li key={index}>
                    {activity}{" "}
                    <span className="text-xs text-gray-400">
                      {index * 2 + 1} min ago
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
