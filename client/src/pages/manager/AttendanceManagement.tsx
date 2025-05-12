import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import {  BulkUpdateAttendance_API, GetAttendanceForEdit_API } from "../../action/AttendanceApi";
import type { AttendanceData } from "../../types/attendance";
import { GetLeaveRequest_API } from "../../action/LeaveApi";





const AttendanceManagement: React.FC = () => {
  const [requests, setRequests] = useState<AttendanceData[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleAction = (ids: string[], action: "Approved" | "Rejected") => {
    BulkUpdateAttendance_API(ids,action)
    setRequests((prev) =>
      prev.map((req) =>
        ids.includes(req._id) && req.status === "Pending"
          ? { ...req, status: action }
          : req
      )
    );
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const pendingIds = requests
      .filter((r) => r.status === "Pending")
      .map((r) => r._id);
    const allSelected = pendingIds.every((id) => selectedIds.includes(id));
    setSelectedIds(allSelected ? [] : pendingIds);
  };
  useEffect(() => {
    const fetchAttendance =async () => {
      try {
        const res1 = await GetLeaveRequest_API()
        
        const res = await GetAttendanceForEdit_API();
        if(res.attendance){
          setRequests(res.attendance)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAttendance();
  },[]);
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Attendance Edit Requests
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={
                requests
                  .filter((r) => r.status === "Pending")
                  .every((r) => selectedIds.includes(r._id)) &&
                selectedIds.length > 0
              }
              onChange={toggleSelectAll}
            />
          }
          label="Select All Pending"
        />
        <Button
          variant="contained"
          color="success"
          disabled={selectedIds.length === 0}
          onClick={() => handleAction(selectedIds, "Approved")}
        >
          Approve All
        </Button>
        <Button
          variant="outlined"
          color="error"
          disabled={selectedIds.length === 0}
          onClick={() => handleAction(selectedIds, "Rejected")}
        >
          Reject All
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {requests.map((request) => (
          <Grid size={{ xs: 12, md: 4 }} key={request._id}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {request.status === "Pending" && (
                    <Checkbox
                      checked={selectedIds.includes(request._id)}
                      onChange={() => toggleSelect(request._id)}
                    />
                  )}
                  <Box>
                    <Typography variant="h6">{request.employeeId}</Typography>
                    <Typography color="textSecondary">
                      Date: {new Date(request.date).toLocaleDateString()}
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
                      onClick={() => handleAction([request._id], "Approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleAction([request._id], "Rejected")}
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

export default AttendanceManagement;
