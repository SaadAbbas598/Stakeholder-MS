import React, { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const sampleProjects = [
  {
    id: 1,
    name: "E-commerce App",
    status: "In Progress",
    total_value: 12000,
    completion_percent: 60,
    total_income: 8000,
    total_expenses: 3000,
  },
  {
    id: 2,
    name: "CRM Platform",
    status: "Completed",
    total_value: 18000,
    completion_percent: 100,
    total_income: 18000,
    total_expenses: 5000,
  },
  {
    id: 3,
    name: "Portfolio Website",
    status: "Not Started",
    total_value: 4000,
    completion_percent: 0,
    total_income: 0,
    total_expenses: 0,
  },
];

function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Simulating API fetch
    setProjects(sampleProjects);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - fixed width on left */}
      <div className="w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Dashboard content - right side */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Project Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {project.name}
                </h2>
                {project.status === "Completed" ? (
                  <CheckCircle className="text-green-500" />
                ) : project.status === "In Progress" ? (
                  <TrendingUp className="text-yellow-500" />
                ) : (
                  <Briefcase className="text-gray-400" />
                )}
              </div>
              <p className="text-gray-600 mb-1">
                <strong>Status:</strong> {project.status}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Completion:</strong> {project.completion_percent}%
              </p>
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Total Value</span>
                  <span>${project.total_value}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Total Income</span>
                  <span className="text-green-600">${project.total_income}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Total Expenses</span>
                  <span className="text-red-600">${project.total_expenses}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-800 font-semibold mt-2">
                  <span>Net Profit</span>
                  <span className="text-blue-600">
                    ${project.total_income - project.total_expenses}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
