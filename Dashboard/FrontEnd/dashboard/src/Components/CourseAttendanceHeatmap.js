import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Scatter } from 'recharts';
import { Container, Typography, Paper } from '@mui/material';

const CourseAttendanceLineChart = () => {
  const [data, setData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.56.1:3000/api/attendance')
      .then(response => {
        setData(response.data);
        processData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const processData = (data) => {
    const processedData = data.map(item => ({
      date: item['Date'],
      absent: item['Attendance'] === 'absent' ? 1 : 0,
      late: item['Attendance'] === 'late' ? 1 : 0,
    }));

    // Aggregate by date if needed
    const aggregatedData = Object.values(
      processedData.reduce((acc, curr) => {
        if (!acc[curr.date]) {
          acc[curr.date] = { date: curr.date, absent: 0, late: 0 };
        }
        acc[curr.date].absent += curr.absent;
        acc[curr.date].late += curr.late;
        return acc;
      }, {})
    );

    setFormattedData(aggregatedData);
  };

  return (
    <Container>
      <Typography variant="h4">Course Attendance Over Time</Typography>
      <Paper style={{ padding: 16 }}>
        {formattedData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={formattedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="absent" stroke="#8884d8" name="Absent" />
              <Scatter dataKey="absent" fill="#8884d8" />
              <Line type="monotone" dataKey="late" stroke="#82ca9d" name="Late" />
              <Scatter dataKey="late" fill="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Typography>Loading data...</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default CourseAttendanceLineChart;
