import { useEffect, useState } from "react";
import { GetDashboard_API, GetEmployee_API } from "../action/AdminApi";
import { GenericTable, type Column } from "../components/GenericTable";
import NumCard from "../components/NumCard";
import { Grid, Box, Typography } from "@mui/material";
type User = {
  firstName: string;
  lastName: string;
  email: string;
  deptId: {
    name: string;
    manager: string;
  };
};
const AdminHomePage = () => {
  const [employees, setEmployees] = useState<User[]>([]);
  const [dashboardStats, setDashboardStats] = useState<any>();
  const columns: Column<User>[] = [
    { id: "firstName", label: "Name" },
    { id: "email", label: "Email" },
    {
      id: "deptId",
      label: "Department",
      render: (_value, row) => row.deptId?.name ?? "-",
    },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await GetDashboard_API();
        if (response.data) {
          setDashboardStats(response.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await GetEmployee_API("emp");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    (async () => {
      await Promise.all([fetchDashboardData(), fetchEmployees()]);
    })();
  }, []);

  return (
    <Box p={2} sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 5, md: 8 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        marginBottom={5}
      >
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <NumCard
            heading="Total Employees"
            count={dashboardStats?.totalEmployees}
          />
        </Grid>
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <NumCard
            heading="Total Departments"
            count={dashboardStats?.totalDepartments}
          />
        </Grid>
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <NumCard heading="Total Salary" count={dashboardStats?.totalSalary} />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box width={"100%"}>
          <Typography variant="h6" fontWeight={600}>
            Employees
          </Typography>
          <GenericTable<User> columns={columns} rows={employees} />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHomePage;
