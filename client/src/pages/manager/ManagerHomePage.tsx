import { Box, Grid } from '@mui/material'
import NumCard from '../../components/NumCard'
const ManagerHome = () => {
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
      <Box sx={{ display: "flex", gap: 2 }}>


      </Box>
    </Box>
  )
}

export default ManagerHome