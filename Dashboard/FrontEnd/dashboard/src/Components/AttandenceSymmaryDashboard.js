import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Typography, Paper } from '@mui/material';

const AttendanceSummaryDashboard = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.56.1:3000/api/attendance')
      .then(response => {
        setData(response.data);
        processSummary(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const processSummary = (data) => {
    const summary = { absent: 0, late: 0 };
    data.forEach(item => {
      if (item['Attendance'] === 'absent' || item['Attendance'] === 'late') {
        summary[item['Attendance']] += 1;
      }
    });
    setSummary(Object.keys(summary).map(key => ({ name: key, value: summary[key] })));
  };

  const COLORS = ['#8884d8', '#82ca9d'];

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
              fill="#8884d8"
              label
            >
              {summary.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
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
