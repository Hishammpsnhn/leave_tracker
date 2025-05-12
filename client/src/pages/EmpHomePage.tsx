import React, { useEffect, useState } from "react";
import Profile from "../components/employee/Profile";
import Attendance from "../components/employee/Attendance";
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import AttendanceListCard from "../components/employee/AttendanceListCard";
import {
  GetAttendanceList_API,
  UpdateAttendance_API,
} from "../action/AttendanceApi";
import { useAuth } from "../context/AuthContext";
import type { AttendanceData } from "../types/attendance";
import EditDialog from "../components/employee/AttendanceEditDialog/EditDialog";
import LeaveSection from "../components/employee/LeaveSection";

const EmpHome = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<string | undefined>(
    undefined
  );
  const [editReason, setEditReason] = useState("");
  const [attendanceList, setAttendanceList] = useState<AttendanceData[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRequestEdit = (id: string) => {
    setSelectedRecord(id);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedRecord(undefined);
    setEditReason("");
  };

  const handleSubmitEditRequest = async () => {
    const res = await UpdateAttendance_API({
      _id: selectedRecord,
      reason: editReason,
      editRequestedBy: user?._id,
      isEdited: false,
      status: "Pending",
    });
    handleCloseEditDialog();
    setAttendanceList((prev) =>
      prev.map((item) =>
        item._id === res.attendance._id ? res.attendance : item
      )
    );
  };

  const getSelectedAttendance = () => {
    return attendanceList.find((record) => record._id === selectedRecord);
  };

  useEffect(() => {
    const getAttendanceList = async () => {
      try {
        const list = await GetAttendanceList_API();
        setAttendanceList(list.attendance);
      } catch (error) {
        console.log(error);
      }
    };
    if (tabValue === 1) {
      getAttendanceList();
    }
  }, [tabValue]);

  return (
    <Container maxWidth="lg">
      <Box py={3}>
        <Paper elevation={0} sx={{ mb: 4, borderRadius: 2 }}>
          <Profile />
        </Paper>

        <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                fontWeight: 600,
                py: 2,
              },
            }}
          >
            <Tab label="Today's Attendance" />
            <Tab label="Attendance History" />
          </Tabs>

          <Box p={3}>
            {tabValue === 0 && (
              <Box>
                <Attendance />
                <LeaveSection />
              </Box>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Attendance Records
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box maxHeight={"50vh"} overflow="scroll">
                  {attendanceList.map((record) => (
                    <AttendanceListCard
                      key={record._id}
                      data={record}
                      onRequestEdit={handleRequestEdit}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
      {/* dialog */}
      <EditDialog
        editDialogOpen={editDialogOpen}
        handleCloseEditDialog={handleCloseEditDialog}
        editReason={editReason}
        getSelectedAttendance={getSelectedAttendance()}
        handleSubmitEditRequest={handleSubmitEditRequest}
        setEditReason={setEditReason}
        setAttendanceList={setAttendanceList}
      />
    </Container>
  );
};

export default EmpHome;
