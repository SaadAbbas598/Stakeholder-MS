import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  useMediaQuery,
  useTheme,
  Divider
} from '@mui/material';

// Chart.js setup
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const DashboardFinance = ({ incomeData, expenseData, projects }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = React.useState(0);

  // Totals
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpense;

  // Data grouping
  const incomeByCategory = incomeData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const expenseByCategory = expenseData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const incomeByProject = incomeData.reduce((acc, item) => {
    acc[item.project] = (acc[item.project] || 0) + item.amount;
    return acc;
  }, {});

  const expenseByProject = expenseData.reduce((acc, item) => {
    acc[item.project] = (acc[item.project] || 0) + item.amount;
    return acc;
  }, {});

  // Chart configs
  const incomeCategoryChartData = {
    labels: Object.keys(incomeByCategory),
    datasets: [
      {
        data: Object.values(incomeByCategory),
        backgroundColor: ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107'],
        borderWidth: 1
      }
    ]
  };

  const expenseCategoryChartData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        data: Object.values(expenseByCategory),
        backgroundColor: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3'],
        borderWidth: 1
      }
    ]
  };

  const projectComparisonChartData = {
    labels: projects,
    datasets: [
      {
        label: 'Income',
        data: projects.map(proj => incomeByProject[proj] || 0),
        backgroundColor: '#4CAF50'
      },
      {
        label: 'Expenses',
        data: projects.map(proj => expenseByProject[proj] || 0),
        backgroundColor: '#F44336'
      }
    ]
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar (left fixed) */}
      <Sidebar />

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, backgroundColor: '#e8f5e9', boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Total Income</Typography>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>${totalIncome.toFixed(2)}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, backgroundColor: '#ffebee', boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Total Expenses</Typography>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>${totalExpense.toFixed(2)}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, backgroundColor: balance >= 0 ? '#e3f2fd' : '#fff3e0', boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Balance</Typography>
                <Typography variant="h4" color={balance >= 0 ? 'success.main' : 'error.main'} sx={{ fontWeight: 600 }}>
                  ${balance.toFixed(2)}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Tabs + Charts */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 2 }}>
                <Tab label="Income Analysis" />
                <Tab label="Expense Analysis" />
                <Tab label="Project Overview" />
              </Tabs>

              <Box sx={{ p: 3, height: isMobile ? 'auto' : '400px' }}>
                {tabValue === 0 && (
                  <>
                    <Typography variant="h6" gutterBottom>Income by Category</Typography>
                    {incomeData.length > 0 ? (
                      <Pie data={incomeCategoryChartData} options={{ responsive: true, maintainAspectRatio: true }} />
                    ) : (
                      <Typography color="text.secondary">No income data available</Typography>
                    )}
                  </>
                )}

                {tabValue === 1 && (
                  <>
                    <Typography variant="h6" gutterBottom>Expenses by Category</Typography>
                    {expenseData.length > 0 ? (
                      <Pie data={expenseCategoryChartData} options={{ responsive: true, maintainAspectRatio: true }} />
                    ) : (
                      <Typography color="text.secondary">No expense data available</Typography>
                    )}
                  </>
                )}

                {tabValue === 2 && (
                  <>
                    <Typography variant="h6" gutterBottom>Income vs Expenses by Project</Typography>
                    {projects.length > 0 ? (
                      <Bar
                        data={projectComparisonChartData}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top'
                            },
                            tooltip: {
                              callbacks: {
                                label: (context) => `${context.dataset.label}: $${context.raw.toFixed(2)}`
                              }
                            }
                          },
                          scales: {
                            y: {
                              beginAtZero: true
                            }
                          }
                        }}
                      />
                    ) : (
                      <Typography color="text.secondary">No project data available</Typography>
                    )}
                  </>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Recent Transactions */}
          <Grid container spacing={3} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>Recent Income</Typography>
                <Divider sx={{ mb: 2 }} />
                {incomeData.slice(0, 5).map((item) => (
                  <Box key={item.id} sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography>
                      <strong>${item.amount.toFixed(2)}</strong> - {item.category} ({item.project})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(item.date).toLocaleDateString()} - {item.description}
                    </Typography>
                  </Box>
                ))}
                {incomeData.length === 0 && (
                  <Typography color="text.secondary">No income recorded</Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>Recent Expenses</Typography>
                <Divider sx={{ mb: 2 }} />
                {expenseData.slice(0, 5).map((item) => (
                  <Box key={item.id} sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography>
                      <strong>${item.amount.toFixed(2)}</strong> - {item.category} ({item.project})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(item.date).toLocaleDateString()} - {item.description}
                    </Typography>
                  </Box>
                ))}
                {expenseData.length === 0 && (
                  <Typography color="text.secondary">No expenses recorded</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardFinance;
