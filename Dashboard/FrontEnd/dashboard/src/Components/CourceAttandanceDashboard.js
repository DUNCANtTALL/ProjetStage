import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Typography, Paper, Grid } from '@mui/material';

const CourseAttendanceDashboard = () => {
  const [data, setData] = useState([]);
  const [courseSummary, setCourseSummary] = useState({});

  useEffect(() => {
    axios.get('http://192.168.56.1:3000/api/attendance')
      .then(response => {
        setData(response.data);
        processCourseSummary(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const processCourseSummary = (data) => {
    const summary = {};

    data.forEach(item => {
      // Extract course initials (e.g., "ENG 1301")
      const courseInitials = item['Course Code'].split(' ')[0] + ' ' + item['Course Code'].split(' ')[1];
      
      if (!summary[courseInitials]) {
        summary[courseInitials] = { absent: 0, late: 0 };
      }
      summary[courseInitials][item['Attendance']] += 1;
    });

    setCourseSummary(summary);
  };

  const renderCharts = () => {
    return Object.keys(courseSummary).map(courseCode => (
      <Grid item xs={12} md={6} key={courseCode}>
        <Paper style={{ padding: 16, marginBottom: 16 }}>
          <Typography variant="h6">{courseCode}</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[{
              course: courseCode,
              absent: courseSummary[courseCode].absent,
              late: courseSummary[courseCode].late
            }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="absent" fill="#8884d8" />
              <Bar dataKey="late" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    ));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Course Attendance</Typography>
      <Grid container spacing={3}>
        {renderCharts()}
      </Grid>
    </Container>
  );
};

export default CourseAttendanceDashboard;
