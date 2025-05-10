import { GenericTable, type Column } from "../components/GenericTable";
import NumCard from "../components/NumCard";
import { Grid, Box } from "@mui/material";
type User = {
  name: string;
  age: number;
  email: string;
};
const AdminHomePage = () => {
  const columns: Column<User>[] = [
    { id: "name", label: "Name" },
    { id: "age", label: "Age" },
    { id: "email", label: "Email" },
  ];

  const rows: User[] = [
    { name: "Alice", age: 30, email: "alice@example.com" },
    { name: "Bob", age: 25, email: "bob@example.com" },
  ];
  return (
    <Box p={2} sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 5, md: 8 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        marginBottom={5}
      >
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <NumCard heading="Total Employees" count={30} />
        </Grid>
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <NumCard heading="Attendance" count={28} />
        </Grid>
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <NumCard heading="Leaves Today" count={2} />
        </Grid>
      </Grid>
      <GenericTable<User> columns={columns} rows={rows} />
    </Box>
  );
};

export default AdminHomePage;
