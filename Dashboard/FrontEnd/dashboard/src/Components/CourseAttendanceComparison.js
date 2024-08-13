import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Container, Typography, Paper } from '@mui/material';

const StackedBarChart = () => {
  const [data, setData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.56.1:3000/api/attendance')
      .then(response => {
        setData(response.data);
        processComparisonData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const processComparisonData = (data) => {
    const summary = {};
    data.forEach(item => {
      if (!summary[item['Course Code']]) {
        summary[item['Course Code']] = { absent: 0, late: 0 };
      }
      summary[item['Course Code']][item['Attendance']] += 1;
    });
    setComparisonData(Object.keys(summary).map(courseCode => ({
      course: courseCode,
      absent: summary[courseCode].absent,
      late: summary[courseCode].late
    })));
  };

  return (
    <Container>
      <Typography variant="h4">Stacked Bar Chart - Course Attendance</Typography>
      <Paper style={{ padding: 16 }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="course" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="absent" stackId="a" fill="#8884d8" />
            <Bar dataKey="late" stackId="a" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  );
};

export default StackedBarChart;
