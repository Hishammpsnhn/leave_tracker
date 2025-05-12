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

// // Define available roles in the company
// const ROLES = ["Manager", "Developer", "Designer", "HR", "Marketing", "Sales", "Finance", "Other"];

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
  console.log(managers)
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
            label="Department"
            onChange={handleSelectChange as any}
          >
            {managers.map((role) => (
              <MenuItem key={role.id} value={role.name}>
                {role.name?.toUpperCase()}
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

    
    </>
  );
};

export default JobDetailsSection;