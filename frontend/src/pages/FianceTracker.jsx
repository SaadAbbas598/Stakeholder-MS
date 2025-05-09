import React, { useState } from 'react';
import { Grid } from '@mui/material';
import DashboardFinance from './DashboradFiance';
import AddProjectFinance from './AddProjectFiance';

const FinanceTracker = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [projects] = useState(['Project A', 'Project B', 'Project C', 'Personal']);

  const handleAddTransaction = (newEntry) => {
    if (newEntry.type === 'income') {
      setIncomeData([...incomeData, newEntry]);
    } else {
      setExpenseData([...expenseData, newEntry]);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <AddProjectFinance
          onAddTransaction={handleAddTransaction} 
          projects={projects} 
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <DashboardFinance
          incomeData={incomeData} 
          expenseData={expenseData} 
          projects={projects} 
        />
      </Grid>
    </Grid>
  );
};

export default FinanceTracker;