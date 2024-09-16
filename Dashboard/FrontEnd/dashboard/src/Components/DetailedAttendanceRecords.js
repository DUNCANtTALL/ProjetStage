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

  
  
  useEffect (()=> {
    const fetcheData = async () =>{
        try {
            const response = await axios.get('http://192.168.56.1:3000/api/attendance'); // Wait for the API response
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error); 
        }        
      

    } 
    fetcheData();
},[]);

  const courseOptions = useMemo(() => {
    const Courses = new Set(); 
    for (let i = 0; i < data.length; i++) {
      Courses.add(data[i]['Course Code']); 
     // console.log("set:"+Courses);
     //const tab = Array.from(Courses); 
     //console.log("tab:"+tab);

    }
    return Array.from(Courses); //convertion en tab
  }, [data]);
  
  
  const filterData = useCallback(() => {
    let filtered = [];
  
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
  
      if (courseFilter && item['Course Code'] !== courseFilter) {
        continue;
      }
  
      if (attendanceFilter && item['Attendance'] !== attendanceFilter) {
        continue;
      }
  
      if (searchQuery) {
        const courseCodeMatch = item['Course Code'].toLowerCase().includes(searchQuery.toLowerCase());
        const studentIdMatch = item['SIS Student ID'].toLowerCase().includes(searchQuery.toLowerCase());
  
        if (courseCodeMatch === false && studentIdMatch === false)  {
          continue;
        }
      }
  
      filtered.push(item);
    }
  
    setFilteredData(filtered);
  }, [data, courseFilter, attendanceFilter, searchQuery]);
  
  useEffect(() => {
    filterData();
  }, [courseFilter, attendanceFilter, searchQuery, filterData]);

  
  const columns = [
    { field: 'Course Code', headerName: 'Course Code', width: 150 },
    { field: 'SIS Student ID', headerName: 'SIS Student ID', width: 150 },
    { field: 'Attendance', headerName: 'Attendance', width: 150 },
    { field: 'Count', headerName: 'Count', width: 150 },
  ];

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };
  
  const handleSearchChange = handleInputChange(setSearchQuery);
  const handleCourseFilterChange = handleInputChange(setCourseFilter);
  const handleAttendanceFilterChange = handleInputChange(setAttendanceFilter);

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
            getRowId={(row) => `${row['Course Code']}-${row['SIS Student ID']}-${row['Class Date']}`} // Composite key
          />
        </div>
      </Paper>
    </Container>
  );
};

export default DetailedAttendanceRecords;
