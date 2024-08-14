import React from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MenuBar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (path) => {
        setAnchorEl(null);
        if (path) {
            navigate(path);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Dashboard Menu
                </Typography>
                <Button color="inherit" onClick={handleClick}>
                    Dashboards
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => handleClose(null)}
                >
                    <MenuItem onClick={() => handleClose('/')}>Attendance Summary Dashboard</MenuItem>
                    <MenuItem onClick={() => handleClose('/course-attendance')}>Course Attendance</MenuItem>
                    <MenuItem onClick={() => handleClose('/course-attendance-comparison')}>Course Attendance Comparison</MenuItem>
                    <MenuItem onClick={() => handleClose('/course-attendance-heatmap')}>Course Attendance</MenuItem>
                    <MenuItem onClick={() => handleClose('/course-attendance-records')}>Course Attendance Records</MenuItem>
                    <MenuItem onClick={() => handleClose('/student-performance')}>Student Performance</MenuItem>
                    <MenuItem onClick={() => handleClose('/daily-weekly-attendance')}>Daily Weekly Attendance</MenuItem>
                    

                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default MenuBar;
