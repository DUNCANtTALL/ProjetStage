import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Container, Typography, Paper } from '@mui/material';

const StackedBarChart = () => {
  const [comparisonData, setComparisonData] = useState([]);

  useEffect (()=> {
    const fetcheData = async () =>{
        try {
            const response = await axios.get('http://192.168.56.1:3000/api/attendance'); // Wait for the API response
            processComparisonData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error); 
        }        
      

    } 
    fetcheData();
},[]);

  const processComparisonData = (data) => {
    const summary = {}; 
  
    for (let i = 0; i < data.length; i++) {
      const item = data[i]; 


      const courseCode = item['Course Code']; 
      const attendance = item['Attendance'];
  
      if (!summary[courseCode]) {
        summary[courseCode] = { absent: 0, late: 0 };
      }
  
      if (attendance === 'absent' || attendance === 'late') {
        summary[courseCode][attendance] += 1;
      }
    }
    //{courseCode : MAC 12 , absent : 2 , late : 3} 
    const Data = [];
    for (let courseCode in summary) {
      Data.push({
        course: courseCode,
        absent: summary[courseCode].absent,
        late: summary[courseCode].late
      });
    }
  
    setComparisonData(Data);
  };
  

  return (
  <Container>
    <Typography variant="h4" align="center">Stacked Bar Chart - Course Attendance</Typography>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Paper style={{ width: "200%", padding: 16 }}>
        <ResponsiveContainer width="100%" height={600}>
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
  </div>
</Container>

  );
};

export default StackedBarChart;
