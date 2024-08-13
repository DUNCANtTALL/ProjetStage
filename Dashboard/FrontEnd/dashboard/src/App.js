import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AttendanceSummaryDashboard from './Components/AttandenceSymmaryDashboard';
import CourseAttendanceDashboard from './Components/CourceAttandanceDashboard';
import CourseAttendanceComparison from './Components/CourseAttendanceComparison';
import CourseAttendanceHeatmap from './Components/CourseAttendanceHeatmap';
import DetailedAttendanceRecords from './Components/DetailedAttendanceRecords';

import { Container, Typography } from '@mui/material';

const App = () => {
  return (
    <Router>
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Attendance Dashboard
        </Typography>
        <Routes>
          <Route path="/" element={<AttendanceSummaryDashboard />} />
          <Route path="/course-attendance" element={<CourseAttendanceDashboard />} />
          <Route path="/course-attendance-comparison" element={<CourseAttendanceComparison />} />
          <Route path="/course-attendance-heatmap" element={<CourseAttendanceHeatmap />} />
          <Route path="/course-attendance-records" element={<DetailedAttendanceRecords />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
