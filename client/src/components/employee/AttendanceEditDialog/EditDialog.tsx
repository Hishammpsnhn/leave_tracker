import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState, type Dispatch, type SetStateAction } from "react";
import type { AttendanceData } from "../../../types/attendance";
import { UpdateAttendance_API } from "../../../action/AttendanceApi";

interface EditDialogProps {
  editDialogOpen: boolean;
  handleCloseEditDialog: () => void;
  handleSubmitEditRequest: () => void;
  editReason: string;
  setEditReason: (value: string) => void;
  getSelectedAttendance: AttendanceData | undefined;
  setAttendanceList:Dispatch<SetStateAction<AttendanceData[]>>
}

const EditDialog: React.FC<EditDialogProps> = ({
  editDialogOpen,
  handleCloseEditDialog,
  handleSubmitEditRequest,
  editReason,
  setEditReason,
  getSelectedAttendance,
  setAttendanceList
}) => {
  const selected = getSelectedAttendance;
  const [loginTime, setLoginTime] = useState<string | null>(null);
  const [logoutTime, setLogoutTime] = useState<string | null>(null);

  const handleTimeUpdate = async () => {
    const res = await UpdateAttendance_API({
      _id: selected?._id,
      loginTime: loginTime ?? selected?.loginTime,
      logoutTime: logoutTime ?? selected?.logoutTime,
      isEdited: true,
    });
       handleCloseEditDialog();
      setAttendanceList((prev) =>
        prev.map((item) =>
          item._id === res.attendance._id ? res.attendance : item
        )
      );
  };

  return (
    <Dialog
      open={editDialogOpen}
      onClose={handleCloseEditDialog}
      maxWidth="sm"
      fullWidth
    >
      {selected?.status === "Approved" && !selected?.isEdited ? (
        <Box>
          <DialogTitle>Attendance Editing</DialogTitle>
          <DialogContent>
            {selected && (
              <Box mt={2}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Editing attendance on{" "}
                  {new Date(selected.date).toLocaleDateString()}
                </Alert>
                <TextField
                  autoFocus
                  margin="dense"
                  id="reason"
                  type="string"
                  fullWidth
                  variant="outlined"
                  value={loginTime ? loginTime : selected.loginTime}
                  onChange={(e) => setLoginTime(e.target.value)}
                  required
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="reason"
                  type="string"
                  fullWidth
                  variant="outlined"
                  value={logoutTime ? logoutTime : selected.logoutTime}
                  onChange={(e) => setLogoutTime(e.target.value)}
                  required
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleTimeUpdate}
              color="primary"
              variant="contained"
              //disabled={!editReason.trim()}
            >
              Submit Request
            </Button>
          </DialogActions>
        </Box>
      ) : (
        <Box>
          <DialogTitle>Request Edit for Attendance</DialogTitle>
          <DialogContent>
            {selected && (
              <Box mt={2}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Requesting edit for attendance on{" "}
                  {new Date(selected.date).toLocaleDateString()}
                </Alert>
                <TextField
                  autoFocus
                  margin="dense"
                  id="reason"
                  label="Reason for Edit"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={editReason}
                  onChange={(e) => setEditReason(e.target.value)}
                  required
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleSubmitEditRequest}
              color="primary"
              variant="contained"
              disabled={!editReason.trim()}
            >
              Submit Request
            </Button>
          </DialogActions>
        </Box>
      )}
    </Dialog>
  );
};

export default EditDialog;
