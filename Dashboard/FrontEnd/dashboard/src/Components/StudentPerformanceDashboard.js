import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const StudentPerformanceVsAttendance = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://192.168.56.1:3000/api/attendance') // Adjust URL as needed
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const aggregateStudentPerformance = (attendanceData) => {
    const aggregatedData = attendanceData.reduce((acc, { "SIS Student ID": studentId, Attendance, Count }) => {
      if (!acc[studentId]) acc[studentId] = { attendanceCount: 0, performanceScore: 0 };
      acc[studentId].attendanceCount += Number(Count);
      // Example of assigning performance score based on attendance (this should be replaced with actual logic)
      acc[studentId].performanceScore = -600 + acc[studentId].attendanceCount * 10; // Placeholder formula
      
      return acc;
    }, {});

    return Object.keys(aggregatedData).map(studentId => ({
      studentId,
      attendanceCount: aggregatedData[studentId].attendanceCount,
      performanceScore: aggregatedData[studentId].performanceScore
    }));
  };

  const studentPerformanceData = aggregateStudentPerformance(data);

  // Filtered data based on search term
  const filteredData = studentPerformanceData.filter(({ studentId }) =>
    studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Student Performance vs. Attendance
        </Typography>
        <TextField
          label="Search by Student ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Attendance Count</TableCell>
                <TableCell>Performance Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map(({ studentId, attendanceCount, performanceScore }) => (
                  <TableRow key={studentId}>
                    <TableCell>{studentId || 'N/A'}</TableCell>
                    <TableCell>{attendanceCount || 0}</TableCell>
                    <TableCell>{performanceScore || 0}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default StudentPerformanceVsAttendance;
