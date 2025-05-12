import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";
import LeaveRequestModal from "./LeaveRequestModal";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CreateLeaveRequest_API } from "../../action/LeaveApi";

const LeaveSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitLeaveRequest = (leaveData: any) => {
    console.log("Leave request submitted:", leaveData);
    CreateLeaveRequest_API(leaveData)
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ padding: "2rem" }}>
        <h1>Employee Portal</h1>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Request Leave
        </Button>

        <LeaveRequestModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitLeaveRequest}
        />
      </div>
    </LocalizationProvider>
  );
};

export default LeaveSection;
