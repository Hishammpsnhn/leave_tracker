import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Snackbar,
  Alert,
  type SelectChangeEvent,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, differenceInDays } from "date-fns";
import type { LeaveRequestFormData } from "../../types/employee";

interface LeaveRequestModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (leaveRequest: LeaveRequestFormData) => void;
}

// interface LeaveRequestFormData {
//   leaveType: string;
//   startDate: Date | null;
//   endDate: Date | null;
//   reason: string;
//   contactInfo: string;
// }

const LeaveRequestModal: React.FC<LeaveRequestModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<LeaveRequestFormData>({
    leaveType: "",
    startDate: null,
    endDate: null,
    reason: "",
    contactInfo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setFormData((prev) => ({ ...prev, [name]: date }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.leaveType) {
      newErrors.leaveType = "Leave type is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate > formData.endDate
    ) {
      newErrors.endDate = "End date must be after start date";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Reason is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateLeaveDuration = () => {
    if (formData.startDate && formData.endDate) {
      const days = differenceInDays(formData.endDate, formData.startDate) + 1;
      return days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "";
    }
    return "";
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (onSubmit) {
        onSubmit(formData);
      }

      setShowSuccess(true);

      setFormData({
        leaveType: "",
        startDate: null,
        endDate: null,
        reason: "",
        contactInfo: "",
      });
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setFormData({
      leaveType: "",
      startDate: null,
      endDate: null,
      reason: "",
      contactInfo: "",
    });
    setErrors({});
    onClose();
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="leave-request-dialog-title"
      >
        <DialogTitle id="leave-request-dialog-title">
          Leave Request Form
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please fill out the following information to submit your leave
            request.
          </DialogContentText>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl
                fullWidth
                error={!!errors.leaveType}
                required
                margin="normal"
              >
                <InputLabel id="leave-type-label">Leave Type</InputLabel>
                <Select
                  labelId="leave-type-label"
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleSelectChange}
                  label="Leave Type"
                >
                  <MenuItem value="annual">Annual Leave</MenuItem>
                  <MenuItem value="sick">Sick Leave</MenuItem>
                  <MenuItem value="personal">Personal Leave</MenuItem>
                  <MenuItem value="maternity">
                    Maternity/Paternity Leave
                  </MenuItem>
                  <MenuItem value="bereavement">Bereavement Leave</MenuItem>
                  <MenuItem value="unpaid">Unpaid Leave</MenuItem>
                </Select>
                {errors.leaveType && (
                  <Typography color="error" variant="caption">
                    {errors.leaveType}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date *"
                    value={formData.startDate}
                    onChange={(date) => handleDateChange("startDate", date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.startDate,
                        helperText: errors.startDate || "",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date *"
                    value={formData.endDate}
                    onChange={(date) => handleDateChange("endDate", date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.endDate,
                        helperText: errors.endDate || "",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {formData.startDate && formData.endDate && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body1">
                    <strong>Duration:</strong> {calculateLeaveDuration()}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="reason"
                label="Reason for Leave *"
                multiline
                rows={4}
                value={formData.reason}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!errors.reason}
                helperText={errors.reason || ""}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="contactInfo"
                label="Contact Information While on Leave"
                value={formData.contactInfo}
                onChange={handleChange}
                fullWidth
                margin="normal"
                placeholder="Phone number or email where you can be reached if needed"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Leave request submitted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default LeaveRequestModal;
