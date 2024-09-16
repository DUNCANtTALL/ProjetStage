import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Typography, Paper, Grid } from '@mui/material';

const CourseAttendanceDashboard = () => {
  const [courseSummary, setCourseSummary] = useState({});

  useEffect (()=> {
    const fetcheData = async () =>{
        try {
            const response = await axios.get('http://192.168.56.1:3000/api/attendance'); // Wait for the API response
            processCourseSummary(response.data);
        } catch (error) {
            console.error('Error fetching data:', error); 
        }        
    } 
    fetcheData();
},[]);

  const processCourseSummary = (data) => {
    const summary = {};
    for (let i = 0; i < data.length; i++) {
      
      const item = data[i]; 
      const courseInitials = item['Course Code'].split(' ')[0]; 
      const Att = item['Attendance'];
    
      if (!summary[courseInitials]) {
        summary[courseInitials] = { absent: 0, late: 0 };
      }
  
      if (item['Attendance'] === 'absent' || item['Attendance'] === 'late') {
        summary[courseInitials][Att] += 1;
      }
    }
    setCourseSummary(summary);
  };

  const renderCharts = () => {
    const charts = []; 
  
    for (let courseCode in courseSummary) {

      const courseData = {
        course: courseCode,
        absent: courseSummary[courseCode].absent,
        late: courseSummary[courseCode].late,
      };
  
      
      charts.push(
        <Grid item xs={12} md={6} key={courseCode}>
          <Paper style={{ padding: 16, marginBottom: 16 }}>
            <Typography variant="h6">{courseCode}</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[courseData]}>
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
      );
    }
    //console.log("charts:"+charts);
  
    return charts; // Return the array of chart components
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
