
  import React, { useState, useEffect } from 'react';
import axios from 'axios';  // For making HTTP requests
import { PieChart, Pie, Cell, Tooltip,Legend,ResponsiveContainer } from 'recharts';  // For charting
import { Container, Typography, Paper } from '@mui/material';  // For styling with Material UI

const AttendanceSummaryDashboard = () => {
  const [summary, setSummary] = useState([]);

 
  useEffect (()=> {
    const fetcheData = async () =>{
        try {
            const response = await axios.get('http://192.168.56.1:3000/api/attendance'); // Wait for the API response
            processSummary(response.data);
        } catch (error) {
            console.error('Error fetching data:', error); 
        }        
      

    } 
    fetcheData();
},[]);

  const processSummary = (data) => {
    const summary = { absent: 0, late: 0 };
      for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.Attendance === 'absent'  || item.Attendance === 'late') {
        summary[item.Attendance] += parseInt(item.Count);
      }
    }
  
    setSummary([
      { name: 'absent', value: summary.absent },
      { name: 'late', value: summary.late }
    ]);
  };
  


  return (
    <Container>
      <Typography variant="h4">Attendance Summary</Typography>
      <Paper style={{ padding: 16 }}>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={summary}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label
            >              
        <Cell key="cell-0" fill="#8884d8" />
        <Cell key="cell-1" fill="#82ca9d" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  );
};

export default AttendanceSummaryDashboard;
