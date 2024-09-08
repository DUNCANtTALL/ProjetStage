import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, Paper, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const DetailedAttendanceRecords = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [courseFilter, setCourseFilter] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch attendance data from the API once
  useEffect(() => {
    axios.get('http://192.168.56.1:3000/api/attendance')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data); // Initially show all data
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Memoize unique course codes for the dropdown to avoid recalculating
  const courseOptions = useMemo(() => {
    return Array.from(new Set(data.map(item => item['Course Code'])));
  }, [data]);

  // Handle filtering by course, attendance, and search query
  const filterData = useCallback(() => {
    let filtered = data;

    // Apply course filter
    if (courseFilter) {
      filtered = filtered.filter(item => item['Course Code'] === courseFilter);
    }

    // Apply attendance filter
    if (attendanceFilter) {
      filtered = filtered.filter(item => item['Attendance'] === attendanceFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item['Course Code'].toLowerCase().includes(lowerCaseQuery) ||
        item['SIS Student ID'].toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredData(filtered);
  }, [data, courseFilter, attendanceFilter, searchQuery]);

  // Trigger data filtering whenever filters or search query change
  useEffect(() => {
    filterData();
  }, [courseFilter, attendanceFilter, searchQuery, filterData]);

  // Columns for DataGrid
  const columns = [
    { field: 'Course Code', headerName: 'Course Code', width: 150 },
    { field: 'SIS Student ID', headerName: 'SIS Student ID', width: 150 },
    { field: 'Attendance', headerName: 'Attendance', width: 150 },
    { field: 'Count', headerName: 'Count', width: 150 },
  ];

  // Handlers for filter and search input changes
  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleCourseFilterChange = (event) => setCourseFilter(event.target.value);
  const handleAttendanceFilterChange = (event) => setAttendanceFilter(event.target.value);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Detailed Attendance Records</Typography>
      
      {/* Search Field */}
      <Paper style={{ padding: 16, marginBottom: 16 }}>
        <TextField
          label="Search by Course Code or SIS Student ID"
          variant="outlined"
          fullWidth
          onChange={handleSearchChange}
        />
      </Paper>

      {/* Filters for Course and Attendance */}
      <Paper style={{ padding: 16, marginBottom: 16 }}>
        <FormControl fullWidth>
          <InputLabel>Filter by Course</InputLabel>
          <Select
            value={courseFilter}
            onChange={handleCourseFilterChange}
            label="Filter by Course"
          >
            <MenuItem value="">All Courses</MenuItem>
            {courseOptions.map(course => (
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

      {/* Data Grid */}
      <Paper style={{ padding: 16 }}>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row['SIS Student ID']}
          />
        </div>
      </Paper>
    </Container>
  );
};

export default DetailedAttendanceRecords;
