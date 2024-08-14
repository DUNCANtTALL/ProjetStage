import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DailyWeeklyAttendanceBreakdown = ({ timePeriod }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.56.1:3000/api/attendance')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const aggregateAttendance = (attendanceData) => {
    const aggregatedData = attendanceData.reduce((acc, { Attendance, Count }) => {
      const date = new Date(); // Placeholder: Replace with actual date extraction if available
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      
      if (!acc[formattedDate]) acc[formattedDate] = { late: 0, absent: 0 };
      if (Attendance === 'late') {
        acc[formattedDate].late += Number(Count);
      } else {
        acc[formattedDate].absent += Number(Count);
      }
      return acc;
    }, {});

    return Object.keys(aggregatedData).map(date => ({
      date,
      late: aggregatedData[date].late,
      absent: aggregatedData[date].absent
    }));
  };

  const breakdownData = aggregateAttendance(data);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {timePeriod === 'daily' ? 'Daily Attendance Breakdown' : 'Weekly Attendance Breakdown'}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Late</TableCell>
                <TableCell>Absent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {breakdownData.map(({ date, late, absent }) => (
                <TableRow key={date}>
                  <TableCell>{date || 'N/A'}</TableCell>
                  <TableCell>{late || 0}</TableCell>
                  <TableCell>{absent || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default DailyWeeklyAttendanceBreakdown;
