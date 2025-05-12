import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { CreateEmployee_API } from "../action/AdminApi";
import axios from "axios";
import type {
  EmployeeFormData,
  Manager,
  ValidationErrors,
} from "../types/employee";
import PersonalInfoSection from "../components/formSections/PersonalInfoSection";
import JobDetailsSection from "../components/formSections/JobDetail";
import ProfilePhotoSection from "../components/formSections/ProfilePhotoSection";
import { GetDepartment_API } from "../action/DeptApi";

const NewEmpRegister = () => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: "",
    lastName: "",
    email: "",
    joiningDate: "",
    profile: null,
    role: "",
    salary: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [managers, setManagers] = useState<Manager[]>([
  
  ]);
  const [isLoadingManagers, setIsLoadingManagers] = useState(false);

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = "Joining date is required";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    // if (formData.role && formData.role !== "Manager" && !formData.managerId) {
    //   newErrors.managerId = "Manager is required for non-manager roles";
    // }

    if (!formData.salary) {
      newErrors.salary = "Salary is required";
    } else if (
      isNaN(parseFloat(formData.salary)) ||
      parseFloat(formData.salary) <= 0
    ) {
      newErrors.salary = "Salary must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => {
      const newFormData = { ...prev, [field]: value };

      return newFormData;
    });

    // Clear error for this field if it exists
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleProfileChange = (profileUrl: string | null) => {
    setFormData((prev) => ({ ...prev, profile: profileUrl }));
    setPreviewUrl(profileUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (!validateForm()) {
      console.log("validation Error");
      return;
    }

    setIsSubmitting(true);

    try {
      await CreateEmployee_API(formData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        joiningDate: "",
        profile: null,
        role: "",
        salary: "",
      });
      setPreviewUrl(null);
      alert("Employee registered successfully!");
    } catch (error) {
      console.error("Error registering employee:", error);
      alert("Failed to register employee. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const getDepartments = async () => {
      setIsLoadingManagers(true);
      try {
        const res = await GetDepartment_API();
        if (res.success) {
          console.log(res.data)
          setManagers(res.data)
          setManagers((prev) =>[ ...prev, {id:"",name:"manager"}]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingManagers(false);
      }
    };
    getDepartments();
  }, []);
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "medium", color: "#1976d2" }}
        >
          Register New Employee
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <PersonalInfoSection
              formData={formData}
              errors={errors}
              onChange={handleFormChange}
            />

            <JobDetailsSection
              formData={formData}
              errors={errors}
              managers={managers}
              isLoadingManagers={isLoadingManagers}
              onChange={handleFormChange}
            />
            <ProfilePhotoSection
              previewUrl={previewUrl}
              onProfileChange={handleProfileChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register New Employee"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default NewEmpRegister;
