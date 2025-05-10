import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, Typography, Box } from '@mui/material';

const Attendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [signInTime, setSignInTime] = useState(null);
  const [signOutTime, setSignOutTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSignIn = () => {
    setSignInTime(new Date());
    setSignOutTime(null);
  };

  const handleSignOut = () => {
    setSignOutTime(new Date());
  };

  const formatTime = (time) => time?.toLocaleTimeString() ?? '--:--:--';

  const getWorkDuration = () => {
    if (signInTime && signOutTime) {
      const diffMs = signOutTime - signInTime;
      const hours = Math.floor(diffMs / 3600000);
      const minutes = Math.floor((diffMs % 3600000) / 60000);
      return `${hours}h ${minutes}m`;
    }
    return '0h 0m';
  };

  return (
    <Card sx={{ maxWidth: 400, bgcolor: '#f5f5f5', p: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Attendance Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          {currentTime.toLocaleDateString()} – {currentTime.toLocaleTimeString()}
        </Typography>

        <Box sx={{ my: 2 }}>
          <Typography variant="body1"><strong>Sign In:</strong> {formatTime(signInTime)}</Typography>
          <Typography variant="body1"><strong>Sign Out:</strong> {formatTime(signOutTime)}</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Total Worked Today:</strong> {getWorkDuration()}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button onClick={handleSignIn} variant="contained" color="primary">Sign In</Button>
        <Button onClick={handleSignOut} variant="contained" color="secondary">Sign Out</Button>
      </CardActions>
    </Card>
  );
};

export default Attendance;
