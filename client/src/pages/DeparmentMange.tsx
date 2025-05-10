import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem
} from "@mui/material";
import Grid from '@mui/material/Grid';


interface WorkingHours {
  start: string;
  end: string;
}

interface Department {
  id: number;
  name: string;
  manager: string;
  workingHours: WorkingHours;
  workingDays: string[];
  shift: string;
}

const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const shiftOptions = ['Morning', 'Evening', 'Night'];

const DepartmentManage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [name, setName] = useState("");
  const [manager, setManager] = useState("");
  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    start: "",
    end: "",
  });
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [shift, setShift] = useState("");

  const toggleDay = (day: string) => {
    setWorkingDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleAddDepartment = () => {
    if (!name || !manager || !workingHours.start || !workingHours.end || workingDays.length === 0 || !shift) return;

    const newDept: Department = {
      id: Date.now(),
      name,
      manager,
      workingHours,
      workingDays,
      shift,
    };

    setDepartments((prev) => [...prev, newDept]);
    setName("");
    setManager("");
    setWorkingHours({ start: "", end: "" });
    setWorkingDays([]);
    setShift("");
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Department Manager
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{xs:12,md:6}}  >
          <TextField
            label="Department Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid size={{xs:12,md:6}}  >
          <TextField
            label="Manager"
            fullWidth
            value={manager}
            onChange={(e) => setManager(e.target.value)}
          />
        </Grid>

        <Grid size={{xs:12,md:6}} >
          <TextField
            label="Start Time"
            type="time"
            fullWidth
            value={workingHours.start}
            onChange={(e) =>
              setWorkingHours({ ...workingHours, start: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={{xs:12,md:6}}  >
          <TextField
            label="End Time"
            type="time"
            fullWidth
            value={workingHours.end}
            onChange={(e) =>
              setWorkingHours({ ...workingHours, end: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={{xs:12,md:6}}  >
          <TextField
            label="Shift"
            select
            fullWidth
            value={shift}
            onChange={(e) => setShift(e.target.value)}
          >
            {shiftOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid >
          <Typography variant="subtitle1">Working Days</Typography>
          <FormGroup row>
            {allDays.map((day) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    checked={workingDays.includes(day)}
                    onChange={() => toggleDay(day)}
                  />
                }
                label={day}
              />
            ))}
          </FormGroup>
        </Grid>

        <Grid >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDepartment}
          >
            Add Department
          </Button>
        </Grid>
      </Grid>

      <List sx={{ mt: 4 }}>
        {departments.map((dept) => (
          <ListItem key={dept.id} divider>
            <ListItemText
              primary={`${dept.name} (Manager: ${dept.manager})`}
              secondary={
                <>
                  <div>Working Hours: {dept.workingHours.start} - {dept.workingHours.end}</div>
                  <div>Working Days: {dept.workingDays.join(', ')}</div>
                  <div>Shift: {dept.shift}</div>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DepartmentManage;
