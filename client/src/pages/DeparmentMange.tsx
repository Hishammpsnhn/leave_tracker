import React, { useEffect, useState } from "react";
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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { CreateDepartment_API, GetDepartment_API } from "../action/DeptApi";
import type {
  Department,
  DepartmentResponse,
  WorkingHours,
} from "../types/dept";
import { GetEmployee_API } from "../action/AdminApi";
import { getTotalHours } from "../utils/TotalHrCalc";

const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const shiftOptions = ["Morning", "Evening", "Night"];
type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const DepartmentManage: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
  const [managers, setManagers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [managerId, setManagerId] = useState("");
  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    start: "",
    end: "",
  });
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [shift, setShift] = useState("");

  const toggleDay = (day: string) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleAddDepartment = async () => {
    if (
      !name ||
      !managerId ||
      !workingHours.start ||
      !workingHours.end ||
      workingDays.length === 0 ||
      !shift
    )
      return;

    const newDept: Department = {
      name,
      managerId,
      workingHours,
      workingDays,
      shift,
    };
    console.log(newDept);
    try {
      const res = await CreateDepartment_API(newDept);
      setDepartments((prev) => [...prev, res.dept]);
      setName("");
      setManagerId("");
      setWorkingHours({ start: "", end: "" });
      setWorkingDays([]);
      setShift("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptRes, userRes] = await Promise.all([
          GetDepartment_API(),
          GetEmployee_API("manager"),
        ]);

        if (deptRes.success) {
          setDepartments(deptRes.data);
        }

        if (userRes.success) {
          setManagers(userRes.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ maxWidth: 700, p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Department Manager
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Department Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth required>
            <InputLabel id="role-label">Manager</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={managerId}
              label="Department"
              onChange={(e) => setManagerId(e.target.value)}
            >
              {managers.map((role) => (
                <MenuItem key={role.email} value={role._id}>
                  {role.firstName.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
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

        <Grid size={{ xs: 12, md: 6 }}>
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

        <Grid size={{ xs: 12, md: 6 }}>
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

        <Grid>
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

        <Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDepartment}
          >
            Add Department
          </Button>
        </Grid>
      </Grid>
      {departments.length ? (
        <List sx={{ mt: 4 }}>
          <Typography variant="h5">Departments</Typography>
          {departments.map((dept) => (
            <ListItem
              key={dept.id}
              divider
              sx={{ bgcolor: "#ecf2f8", marginY: 1, borderRadius: "5px" }}
            >
              <ListItemText
                primary={`${dept.name.toUpperCase()} (Manager: ${
                  dept.managerId.firstName
                })`}
                secondary={
                  <>
                    <div>
                      Working Hours: {dept.workingHours.start} -{" "}
                      {dept.workingHours.end} (
                      {getTotalHours(
                        dept.workingHours.start,
                        dept.workingHours.end
                      )}
                      )
                    </div>

                    <div>Working Days: {dept.workingDays.join(", ")}</div>
                    <div>Shift: {dept.shift}</div>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default DepartmentManage;
