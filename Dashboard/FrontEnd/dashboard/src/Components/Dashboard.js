// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Typography, Paper, Grid } from '@mui/material';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    axios.get('http://localhost:3000/api/attendance')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Attendance Overview</Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Course Code" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        {/* Add more components here */}
      </Grid>
    </Container>
  );
};

export default Dashboard;
