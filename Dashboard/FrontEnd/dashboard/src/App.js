import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseAttendanceDashboard from './Components/CourceAttandanceDashboard';
import CourseAttendanceComparison from './Components/CourseAttendanceComparison';
import DetailedAttendanceRecords from './Components/DetailedAttendanceRecords';
import AttendanceSummaryDashboard from './Components/AttendanceSummaryDashboard';
import MenuBar from './Components/MenuBar';


import { Container, Typography } from '@mui/material';

const App = () => {
  return (
    <Router>
    <MenuBar />

      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Attendance Dashboard
        </Typography>
        <Routes>
          <Route path="/" element={<AttendanceSummaryDashboard />} />
          <Route path="/course-attendance" element={<CourseAttendanceDashboard />} />
          <Route path="/course-attendance-comparison" element={<CourseAttendanceComparison />} />
          <Route path="/course-attendance-records" element={<DetailedAttendanceRecords />} />




        </Routes>
      </Container>
    </Router>
  );
};

export default App;
