import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, Paper, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const DetailedAttendanceRecords = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [courseFilter, setCourseFilter] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState('');

  useEffect(() => {
    axios.get('http://192.168.56.1:3000/api/attendance')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = [
    { field: 'Course Code', headerName: 'Course Code', width: 150 },
    { field: 'SIS Student ID', headerName: 'SIS Student ID', width: 150 },
    { field: 'Attendance', headerName: 'Attendance', width: 150 },
    { field: 'Count', headerName: 'Count', width: 150 },
  ];

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = data.filter(item =>
      item['Course Code'].toLowerCase().includes(query) ||
      item['SIS Student ID'].toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  const handleCourseFilterChange = (event) => {
    setCourseFilter(event.target.value);
  };

  const handleAttendanceFilterChange = (event) => {
    setAttendanceFilter(event.target.value);
  };

  useEffect(() => {
    let result = data;
    if (courseFilter) result = result.filter(item => item['Course Code'] === courseFilter);
    if (attendanceFilter) result = result.filter(item => item['Attendance'] === attendanceFilter);
    setFilteredData(result);
  }, [courseFilter, attendanceFilter, data]);

  return (
    <Container>
      <Typography variant="h4">Detailed Attendance Records</Typography>
      <Paper style={{ padding: 16, marginBottom: 16 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          onChange={handleSearch}
        />
      </Paper>
      <Paper style={{ padding: 16, marginBottom: 16 }}>
        <FormControl fullWidth>
          <InputLabel>Filter by Course</InputLabel>
          <Select
            value={courseFilter}
            onChange={handleCourseFilterChange}
            label="Filter by Course"
          >
            <MenuItem value="">All Courses</MenuItem>
            {Array.from(new Set(data.map(item => item['Course Code']))).map(course => (
              <MenuItem key={course} value={course}>{course}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: 16 }}>
          <InputLabel>Filter by Attendance</InputLabel>
          <Select
            value={attendanceFilter}
            onChange={handleAttendanceFilterChange}
            label="Filter by Attendance"
          >
            <MenuItem value="">All Attendance</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
            <MenuItem value="late">Late</MenuItem>
          </Select>
        </FormControl>
      </Paper>
      <Paper style={{ padding: 16 }}>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row['SIS Student ID']} // Ensure this is unique
          />
        </div>
      </Paper>
    </Container>
  );
};

export default DetailedAttendanceRecords;
