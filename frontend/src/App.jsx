import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Dashboard from './pages/Dashboard'
import Stakeholders from './pages/Stakeholders'
import ProjectManagement from './pages/ProjectManage'
import IncomeExpenseTracker from './pages/IncomeExpense'
import FinanceTracker from './pages/FianceTracker'
import Reports from './pages/Reports'

function App() {
  return (
    <Router>
      {/* You can uncomment Sidebar and if you want it on all pages */}
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stakeholders" element={<Stakeholders />} />
        <Route path="/projects" element={<ProjectManagement />} />
        <Route path="/financials" element={<IncomeExpenseTracker />} />
        <Route path="/profit-distribution" element={<FinanceTracker />} />
        <Route path="/reports" element={<Reports />} />




      </Routes>
    </Router>
  )
}

export default App
