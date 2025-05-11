import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
  Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar'; // ✅ Import Navbar

const AddProjectFinance = ({ onAddTransaction }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income');

  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];
  const expenseCategories = ['Food', 'Transport', 'Housing', 'Entertainment', 'Utilities', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      id: Date.now(),
      amount: parseFloat(amount),
      date,
      category,
      project,
      description,
      type
    };

    onAddTransaction(newEntry);

    // Reset form
    setAmount('');
    setCategory('');
    setProject('');
    setDescription('');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex" minHeight="100vh" bgcolor="#f4f6f8">
        {/* Sidebar */}
        <Box sx={{ width: '250px', flexShrink: 0, bgcolor: '#fff', boxShadow: 3 }}>
          <Sidebar />
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <Box sx={{ flexGrow: 1, p: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
              Add Transaction
            </Typography>

            <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
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
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Date"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth required />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Category"
                        required
                      >
                        {(type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
                          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Project"
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      required
                      placeholder="Enter project name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      multiline
                      rows={4}
                      placeholder="Write any extra details..."
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      color="primary"
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        fontWeight: 'bold',
                        letterSpacing: 1
                      }}
                    >
                      Add Transaction
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default AddProjectFinance;
