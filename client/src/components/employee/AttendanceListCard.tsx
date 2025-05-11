import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { AttendanceData } from "../../types/attendance";

type AttendanceCardProps = {
  data: AttendanceData;
  onRequestEdit: (id: string) => void;
};

const AttendanceListCard: React.FC<AttendanceCardProps> = ({
  data,
  onRequestEdit,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    if (data.isLate) return "warning";
    if (status.toLowerCase() === "approved") return "success";
    if (status.toLowerCase() === "pending") return "info";
    return "default";
  };

  return (
    <Card sx={{ mb: 2, width: "100%" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1">{formatDate(data.date)}</Typography>
          <Box gap={2} display="flex" alignItems="center">
            {data.editRequestedBy && (
              <Chip
                label={data.isLate ? "Late" : data.status}
                color={getStatusColor(data.status) as any}
                size="small"
              />
            )}
            <Button
              size="small"
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => onRequestEdit(data._id)}
            >
              Edit
            </Button>
          </Box>
        </Box>

        <Typography variant="body2" mt={1}>
          Login: {data.loginTime}
        </Typography>
        <Typography variant="body2">Logout: {data.logoutTime}</Typography>

        {data.reason && (
          <Typography variant="body2" mt={1}>
            Reason: {data.reason}
          </Typography>
        )}

        {data.isEdited && (
          <Box mt={1}>
            <Typography variant="caption">
              Approved by: {data.editApprovedBy || "N/A"}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceListCard;
