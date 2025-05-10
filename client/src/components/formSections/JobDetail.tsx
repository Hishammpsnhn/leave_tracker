// File: src/components/employee/form-sections/JobDetailsSection.tsx
import React from 'react';
import { 
  Box, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  InputAdornment
} from '@mui/material';
import type { EmployeeFormData, Manager, ValidationErrors } from '../../types/employee';

// Define available roles in the company
const ROLES = ["Manager", "Developer", "Designer", "HR", "Marketing", "Sales", "Finance", "Other"];

interface JobDetailsSectionProps {
  formData: EmployeeFormData;
  errors: ValidationErrors;
  managers: Manager[];
  isLoadingManagers: boolean;
  onChange: (field: string, value: string) => void;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({
  formData,
  errors,
  managers,
  isLoadingManagers,
  onChange
}) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };
  
  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    onChange(name, value);
  };
  
  return (
    <>
      <Box sx={{ display: "flex", gap: 2 }}>
        <FormControl fullWidth error={!!errors.role} required>
          <InputLabel id="role-label">Role in Company</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            name="role"
            value={formData.role}
            label="Role in Company"
            onChange={handleSelectChange as any}
          >
            {ROLES.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
          {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
        </FormControl>

        <TextField
          label="Salary"
          variant="outlined"
          fullWidth
          type='number'
          name="salary"
          value={formData.salary}
          onChange={handleInputChange}
          required
          error={!!errors.salary}
          helperText={errors.salary}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Box>

      {/* Manager Selection (only if role is not Manager) */}
      {formData.role && formData.role !== "Manager" && (
        <FormControl fullWidth error={!!errors.managerId} required>
          <InputLabel id="manager-label">Manager</InputLabel>
          <Select
            labelId="manager-label"
            id="managerId"
            name="managerId"
            value={formData.managerId}
            label="Manager"
            onChange={handleSelectChange as any}
            disabled={isLoadingManagers}
          >
            {managers.map((manager) => (
              <MenuItem key={manager.id} value={manager.id}>
                {manager.name}
              </MenuItem>
            ))}
          </Select>
          {errors.managerId && <FormHelperText>{errors.managerId}</FormHelperText>}
        </FormControl>
      )}
    </>
  );
};

export default JobDetailsSection;