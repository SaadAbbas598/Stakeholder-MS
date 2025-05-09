import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  
  Box,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const IncomeExpenseTracker = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for form inputs
  const [tabValue, setTabValue] = useState(0);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income');
  const [openDialog, setOpenDialog] = useState(false);
  
  // State for stored data
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [projects, setProjects] = useState([
    'Project A', 'Project B', 'Project C', 'Personal'
  ]);
  
  // Sample categories
  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];
  const expenseCategories = ['Food', 'Transport', 'Housing', 'Entertainment', 'Utilities', 'Other'];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newEntry = {
      id: Date.now(),
      amount: parseFloat(amount),
      date: date,
      category,
      project,
      description
    };
    
    if (type === 'income') {
      setIncomeData([...incomeData, newEntry]);
    } else {
      setExpenseData([...expenseData, newEntry]);
    }
    
    // Reset form and close dialog
    setAmount('');
    setCategory('');
    setDescription('');
    setOpenDialog(false);
  };
  
  // Calculate totals
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpense;
  
  // Prepare chart data
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
  
  // Chart configurations
  const incomeCategoryChartData = {
    labels: Object.keys(incomeByCategory),
    datasets: [
      {
        data: Object.values(incomeByCategory),
        backgroundColor: [
          '#4CAF50',
          '#8BC34A',
          '#CDDC39',
          '#FFEB3B',
          '#FFC107'
        ],
        borderWidth: 1
      }
    ]
  };
  
  const expenseCategoryChartData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        data: Object.values(expenseByCategory),
        backgroundColor: [
          '#F44336',
          '#E91E63',
          '#9C27B0',
          '#673AB7',
          '#3F51B5',
          '#2196F3'
        ],
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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Financial Dashboard
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleOpenDialog}
            sx={{ height: 'fit-content' }}
          >
            Add Transaction
          </Button>
        </Box>
        
        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, backgroundColor: '#e8f5e9' }}>
              <Typography variant="h6">Total Income</Typography>
              <Typography variant="h4">${totalIncome.toFixed(2)}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, backgroundColor: '#ffebee' }}>
              <Typography variant="h6">Total Expenses</Typography>
              <Typography variant="h4">${totalExpense.toFixed(2)}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, backgroundColor: balance >= 0 ? '#e3f2fd' : '#fff3e0' }}>
              <Typography variant="h6">Balance</Typography>
              <Typography variant="h4" color={balance >= 0 ? 'success.main' : 'error.main'}>
                ${balance.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Charts Section */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Income Analysis" />
                <Tab label="Expense Analysis" />
                <Tab label="Project Overview" />
              </Tabs>
              
              <Box sx={{ p: 3, height: isMobile ? 'auto' : '400px' }}>
                {tabValue === 0 && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      Income by Category
                    </Typography>
                    {Object.keys(incomeByCategory).length > 0 ? (
                      <Pie data={incomeCategoryChartData} />
                    ) : (
                      <Typography color="text.secondary" align="center">
                        No income data available
                      </Typography>
                    )}
                  </>
                )}
                
                {tabValue === 1 && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      Expenses by Category
                    </Typography>
                    {Object.keys(expenseByCategory).length > 0 ? (
                      <Pie data={expenseCategoryChartData} />
                    ) : (
                      <Typography color="text.secondary" align="center">
                        No expense data available
                      </Typography>
                    )}
                  </>
                )}
                
                {tabValue === 2 && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      Income vs Expenses by Project
                    </Typography>
                    <Bar
                      data={projectComparisonChartData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top'
                          }
                        }
                      }}
                    />
                  </>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Recent Transactions */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Income
              </Typography>
              {incomeData.slice(0, 5).map((item) => (
                <Box key={item.id} sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography>
                    <strong>${item.amount.toFixed(2)}</strong> - {item.category} ({item.project})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {format(new Date(item.date), 'MMM dd, yyyy')} - {item.description}
                  </Typography>
                </Box>
              ))}
              {incomeData.length === 0 && (
                <Typography color="text.secondary">No income recorded</Typography>
              )}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Expenses
              </Typography>
              {expenseData.slice(0, 5).map((item) => (
                <Box key={item.id} sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography>
                    <strong>${item.amount.toFixed(2)}</strong> - {item.category} ({item.project})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {format(new Date(item.date), 'MMM dd, yyyy')} - {item.description}
                  </Typography>
                </Box>
              ))}
              {expenseData.length === 0 && (
                <Typography color="text.secondary">No expenses recorded</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
        
        {/* Add Transaction Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Type</InputLabel>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Type"
                >
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                margin="normal"
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              
              <DatePicker
                label="Date"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" required />
                )}
              />
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  required
                >
                  {type === 'income' ? (
                    incomeCategories.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))
                  ) : (
                    expenseCategories.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Project</InputLabel>
                <Select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  label="Project"
                  required
                >
                  {projects.map((proj) => (
                    <MenuItem key={proj} value={proj}>{proj}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={3}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Save Transaction
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};

export default IncomeExpenseTracker;