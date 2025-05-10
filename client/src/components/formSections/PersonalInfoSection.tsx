import React from 'react';
import { Box, TextField } from '@mui/material';
import type { EmployeeFormData, ValidationErrors } from '../../types/employee';

interface PersonalInfoSectionProps {
  formData: EmployeeFormData;
  errors: ValidationErrors;
  onChange: (field: string, value: string) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  errors,
  onChange
}) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };
  
  return (
    <>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          error={!!errors.firstName}
          helperText={errors.firstName}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Joining Date"
          variant="outlined"
          type="date"
          fullWidth
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleInputChange}
          required
          error={!!errors.joiningDate}
          helperText={errors.joiningDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
    </>
  );
};

export default PersonalInfoSection;