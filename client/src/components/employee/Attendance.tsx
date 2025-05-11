import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { format, differenceInMinutes } from "date-fns";
import {
  GetSignInfo_API,
  SignIn_API,
  UpdateAttendance_API,
} from "../../action/AttendanceApi";
import type { AttendanceEntry } from "../../types/attendance";
import {
  convertUTCToLocalTimeOnly,
  getTimeDifferenceHHMM,
} from "../../utils/LocalConverter";

const Attendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [signInTime, setSignInTime] = useState<string | null>(null);
  const [attendanceDetails, setAttendanceDetails] =
    useState<AttendanceEntry<string> | null>(null);

  const handleSignIn = async () => {
    const now = new Date();
    console.log(now);
    const localString = now.toLocaleString('sv-SE');
    const res = await SignIn_API(localString);
    if (res?.attendance?.loginTime) {
      setSignInTime(res?.attendance?.loginTime);
      setAttendanceDetails(res.attendance);
    }
    //setSignOutTime(null);
  };

  const handleSignOut = async () => {
    if (!attendanceDetails) {
      return;
    }
    let logout = convertUTCToLocalTimeOnly(new Date());
    const res = await UpdateAttendance_API({
      logoutTime: logout,
      _id: attendanceDetails._id,
    });
    if (res.attendance) {
      setAttendanceDetails(res.attendance);
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await GetSignInfo_API();
        setSignInTime(res.attendance.loginTime);
        setAttendanceDetails(res.attendance);
      } catch (error) {
        console.log(error);
      }
    };
    if (!signInTime) getInfo();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card
      sx={{
        maxWidth: 400,
        bgcolor: "#f5f5f5",
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Attendance Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
          {format(currentTime, "PPP")} – {format(currentTime, "hh:mm:ss a")}
        </Typography>

        <Box sx={{ my: 2 }}>
          <Typography variant="body1">
            <strong>Sign In:</strong> {signInTime ?? "--:--:--"}
          </Typography>
          <Typography variant="body1">
            <strong>Sign Out:</strong>{" "}
            {attendanceDetails?.logoutTime ?? "--:--:--"}
          </Typography>
          {signInTime && attendanceDetails?.logoutTime ? (
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Total Worked Today:</strong>{" "}
              {getTimeDifferenceHHMM(signInTime, attendanceDetails?.logoutTime)}
            </Typography>
          ) : (
            <></>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          onClick={handleSignIn}
          disabled={signInTime ? true : false}
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
        <Button
          onClick={handleSignOut}
          disabled={!signInTime || attendanceDetails?.logoutTime ? true : false}
          variant="contained"
          color="secondary"
        >
          Sign Out
        </Button>
      </CardActions>
    </Card>
  );
};

export default Attendance;
