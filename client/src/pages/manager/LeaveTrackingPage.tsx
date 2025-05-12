import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Paper,
} from "@mui/material";
import {
  GetLeaveRequest_API,
  UpdateLeaveRequest_API,
} from "../../action/LeaveApi";
import type { LeaveRequest } from "../../types/employee";

const LeaveTracking: React.FC = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);

  const handleAction = async (id: string, action: "Approved" | "Rejected") => {
    try {
      await UpdateLeaveRequest_API(id, { status: action });

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id && req.status === "Pending"
            ? { ...req, status: action }
            : req
        )
      );
    } catch (error) {
      console.error("Failed to update leave request:", error);
    }
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await GetLeaveRequest_API();
        console.log(res);

        if (res.leaveRequest) {
          setRequests(res.leaveRequest);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAttendance();
  }, []);
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Leave Requests
      </Typography>

      <Grid container spacing={2}>
        {requests.map((request) => (
          <Grid size={{ xs: 12, md: 4 }} key={request._id}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box>
                    <Typography variant="h6">{request.empId}</Typography>
                    <Typography color="textSecondary">
                      Date: {new Date(request.startDate).toLocaleDateString()}
                    </Typography>
                    <Typography color="textSecondary">
                      Reason: {request.reason}
                    </Typography>
                    <Typography color="textSecondary">
                      Status: <strong>{request.status}</strong>
                    </Typography>
                  </Box>
                </Stack>
                {request.status === "Pending" && (
                  <Stack direction="row" spacing={2} mt={2}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAction(request._id, "Approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleAction(request._id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
        {requests.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={1} sx={{ padding: 2 }}>
              <Typography>No requests found.</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default LeaveTracking;
